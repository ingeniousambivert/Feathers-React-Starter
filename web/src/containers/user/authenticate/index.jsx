/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/local/icons";
import { Link } from "@/components/local";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, validatorResolver, validator } from "@/components/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function AuthenticateUser({ authenticateUser, status }) {
  const form = useForm({
    resolver: validatorResolver(
      validator.object({
        email: validator.string({
          required_error: "An email is required."
        }),
        password: validator.string({
          required_error: "A password is required."
        })
      })
    )
  });

  return (
    <Card className="p-2">
      <CardHeader className="space-y-6">
        <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(authenticateUser)} className="space-y-8" action="POST">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="bg-gray-50 text-black" {...field} placeholder="Email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="bg-gray-50 text-black"
                        {...field}
                        type="password"
                        placeholder="Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between align-middle gap-4 py-2">
              <div>
                {status === "loading" ? (
                  <Button className="w-auto md:w-48" type="submit" disabled>
                    <Spinner className="mr-2 h-4 w-4 animate-spin" />
                    Sign In
                  </Button>
                ) : (
                  <Button className="w-auto md:w-48" type="submit">
                    Sign In
                  </Button>
                )}
              </div>
              <div>
                <div className="text-sm">
                  Don&apos;t have an account?&nbsp;
                  <Link to={"/signup"}>
                    <span className="hover:text-blue-600 text-sm cursor-pointer">Sign Up</span>
                  </Link>
                </div>
                <div className="text-sm">
                  Forgot password?&nbsp;
                  <Link to={"/forgot-password"}>
                    <span className="hover:text-blue-600 text-sm cursor-pointer">Reset</span>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
export default AuthenticateUser;
