import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateApp, useListApps, useDeleteApp, getListAppsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Shield, Plus, Trash2, Image as ImageIcon, LogOut, Loader2 } from "lucide-react";
import { useAdmin } from "@/hooks/use-admin";
import AdminLogin from "./admin-login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(10, "Description is too short"),
  logoUrl: z.string().url("Must be a valid URL"),
  screenshots: z.string(), // We'll split this by newline before submit
  downloadUrl: z.string().url("Must be a valid URL"),
  size: z.string().min(1, "Size is required"),
  version: z.string().min(1, "Version is required"),
  developer: z.string().min(1, "Developer is required"),
  featured: z.boolean().default(false),
});

export default function Admin() {
  const { isAdmin, loading, logout, email } = useAdmin();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return <AdminLogin />;
  }

  return <AdminPanel onLogout={logout} email={email} />;
}

function AdminPanel({ onLogout, email }: { onLogout: () => void; email?: string }) {
  const queryClient = useQueryClient();
  const { data: apps, isLoading: appsLoading } = useListApps();
  const createApp = useCreateApp();
  const deleteApp = useDeleteApp();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      logoUrl: "",
      screenshots: "",
      downloadUrl: "",
      size: "10 MB",
      version: "1.0.0",
      developer: "",
      featured: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const screenshotsArray = values.screenshots
      .split("\n")
      .map(s => s.trim())
      .filter(s => s.length > 0);

    createApp.mutate({
      data: {
        ...values,
        screenshots: screenshotsArray,
      }
    }, {
      onSuccess: () => {
        toast.success("App created successfully");
        form.reset();
        queryClient.invalidateQueries({ queryKey: getListAppsQueryKey() });
      },
      onError: (err) => {
        toast.error("Failed to create app");
        console.error(err);
      }
    });
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      deleteApp.mutate({ id }, {
        onSuccess: () => {
          toast.success("App deleted");
          queryClient.invalidateQueries({ queryKey: getListAppsQueryKey() });
        },
        onError: () => toast.error("Failed to delete app")
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex items-center justify-between gap-3 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-brand flex items-center justify-center text-white">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              {email ? `Signed in as ${email}` : "Manage apps and platform settings"}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={onLogout}
          className="border-white/15 hover:bg-white/5"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>

      <div className="grid md:grid-cols-[2fr_1fr] gap-8">
        <Card className="glassmorphism border-white/10 bg-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              Add New App
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>App Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Super Mod APK" className="bg-black/20" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-black/20">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="gaming">Gaming</SelectItem>
                            <SelectItem value="tools">Tools</SelectItem>
                            <SelectItem value="movies">Movies</SelectItem>
                            <SelectItem value="study">Study</SelectItem>
                            <SelectItem value="entertainment">Entertainment</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="social">Social</SelectItem>
                            <SelectItem value="productivity">Productivity</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Full features and description..." className="bg-black/20 min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="developer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Developer</FormLabel>
                        <FormControl>
                          <Input placeholder="Dev Name" className="bg-black/20" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="logoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Logo URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." className="bg-black/20" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="screenshots"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Screenshots URLs</FormLabel>
                      <FormDescription>One URL per line</FormDescription>
                      <FormControl>
                        <Textarea placeholder="https://...\nhttps://..." className="bg-black/20 min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="downloadUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Download URL (APK)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." className="bg-black/20" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>File Size</FormLabel>
                        <FormControl>
                          <Input placeholder="15.5 MB" className="bg-black/20" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="version"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Version</FormLabel>
                        <FormControl>
                          <Input placeholder="1.0.0" className="bg-black/20" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-xl border border-white/10 p-4 bg-black/20">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Featured App</FormLabel>
                        <FormDescription>
                          Show this app in the hero banner and featured sections.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-brand text-white" 
                  disabled={createApp.isPending}
                >
                  {createApp.isPending ? "Creating..." : "Publish App"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="glassmorphism border-white/10 bg-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-accent" />
                Manage Apps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-2 no-scrollbar">
                {appsLoading ? (
                  <p className="text-muted-foreground text-sm">Loading apps...</p>
                ) : apps?.map(app => (
                  <div key={app.id} className="flex items-center gap-3 p-3 rounded-lg bg-black/20 border border-white/5">
                    <img src={app.logoUrl} alt={app.name} className="w-10 h-10 rounded-md object-cover bg-white/5" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{app.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{app.category}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-red-500 hover:text-red-400 hover:bg-red-500/10 h-8 w-8"
                      onClick={() => handleDelete(app.id, app.name)}
                      disabled={deleteApp.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {!appsLoading && apps?.length === 0 && (
                  <p className="text-muted-foreground text-sm text-center py-4">No apps found.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
