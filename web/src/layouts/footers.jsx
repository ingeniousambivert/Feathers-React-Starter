import { appName } from "@/utils/constants";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="ml-auto mr-auto font-medium text-xs min-h-footer">
      &copy; {currentYear} {appName}
    </div>
  );
}

export default Footer;
