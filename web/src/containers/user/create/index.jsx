/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Link } from "@/components/local";
import { Spinner } from "@/components/local/icons";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, validatorResolver, validator } from "@/components/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function CreateUser({ createUser, status }) {
  const form = useForm({
    resolver: validatorResolver(
      validator.object({
        firstname: validator.string({
          required_error: "A first name is required."
        }),
        lastname: validator.string({
          required_error: "A last name is required."
        }),
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
        <CardTitle className="text-2xl text-center">Welcome Onboard</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(createUser)} className="space-y-8" action="POST">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="First Name" className="bg-gray-50 text-black" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Last Name" className="bg-gray-50 text-black" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" className="bg-gray-50 text-black" {...field} />
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
                        placeholder="Password"
                        className="bg-gray-50 text-black"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="py-2 flex flex-col gap-4">
              <div className="text-center">
                {status === "loading" ? (
                  <Button className="w-3/4" type="submit" disabled>
                    <Spinner className="mr-2 h-4 w-4 animate-spin" />
                    Sign Up
                  </Button>
                ) : (
                  <Button className="w-3/4" type="submit">
                    Sign Up
                  </Button>
                )}
              </div>
              <div className="text-sm text-center">
                Already have an account?&nbsp;
                <Link to={"/signin"}>
                  <span className="hover:text-blue-600 text-sm cursor-pointer">Signin</span>
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
export default CreateUser;
