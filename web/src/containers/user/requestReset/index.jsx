/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/local/icons";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, validatorResolver, validator } from "@/components/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function RequestPasswordReset({ requestReset, status }) {
  const form = useForm({
    resolver: validatorResolver(
      validator.object({
        email: validator.string({
          required_error: "An email is required."
        })
      })
    )
  });

  return (
    <Card className="p-12">
      <CardHeader className="space-y-6">
        <CardTitle className="text-2xl text-center">Forgot Your Password?</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(requestReset)} className="space-y-8" action="POST">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <p className="text-center text-sm my-4">
                      Enter your email to recieve a password reset link.
                    </p>
                    <FormControl>
                      <Input className="bg-gray-50 text-black" {...field} placeholder="Email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="text-center py-2">
              {status === "loading" ? (
                <Button className="w-auto md:w-48" type="submit" disabled>
                  <Spinner className="mr-2 h-4 w-4 animate-spin" />
                  Send
                </Button>
              ) : (
                <Button className="w-auto md:w-48" type="submit">
                  Send
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
export default RequestPasswordReset;
