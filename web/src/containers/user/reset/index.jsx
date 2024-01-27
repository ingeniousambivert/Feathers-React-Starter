/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/local/icons";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, validatorResolver, validator } from "@/components/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function ResetPassword({ resetPassword, status }) {
  const form = useForm({
    resolver: validatorResolver(
      validator.object({
        password: validator.string({
          required_error: "A password is required."
        })
      })
    )
  });

  return (
    <Card className="p-2">
      <CardHeader className="space-y-6">
        <CardTitle className="text-2xl text-center">Reset Your Password</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(resetPassword)} className="space-y-8" action="POST">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <p className="text-center text-sm my-4">Enter a new password.</p>
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
            <div className="py-2 text-center">
              {status === "loading" ? (
                <Button className="w-auto md:w-48" type="submit" disabled>
                  <Spinner className="mr-2 h-4 w-4 animate-spin" />
                  Reset
                </Button>
              ) : (
                <Button className="w-auto md:w-48" type="submit">
                  Reset
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
export default ResetPassword;
