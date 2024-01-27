import { Link } from "@/components/local";
import { LogOut, LogIn } from "@/components/local/icons";
import { Button } from "@/components/ui/button";
import useStore, { unsetAppDataSelector, authenticationSelector } from "@/store";
import { signOutUserThunk } from "@/clients/user";
import { appName } from "@/utils/constants";
import { useNavigate } from "react-router-dom";

function Header() {
  const isAuthenticated = useStore(authenticationSelector);
  const unsetAppData = useStore(unsetAppDataSelector);
  const navigate = useNavigate();
  return (
    <div className="flex my-4 items-center justify-between px-4 min-h-header ">
      <div>
        <Link className="font-semibold" to={"/"}>
          {appName}
        </Link>
      </div>
      {isAuthenticated ? (
        <div>
          <Button
            variant="ghost"
            className="hover:text-red-500 text-sm cursor-pointer"
            onClick={async () => {
              await signOutUserThunk();
              await unsetAppData();
            }}
          >
            Sign Out&nbsp;
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div>
          <Button
            variant="ghost"
            className="hover:text-blue-600 text-sm cursor-pointer"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Sign In&nbsp;
            <LogIn className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default Header;
