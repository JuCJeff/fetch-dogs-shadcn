import { LogoutButton } from "@/components/Authentication/LogoutButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SearchPage() {
  return (
    <div>
      <div className="flex flex-col sticky top-0 py-8 w-full">
        <h1>Search Page</h1>
        <Tabs
          defaultValue="all-dogs"
          className="py-4 w-full flex items-center md:w-[400px]"
        >
          <TabsList>
            <TabsTrigger value="all-dogs">All Dogs 🐕</TabsTrigger>
            <TabsTrigger value="favorite-dogs">Favorite Dogs ❤️</TabsTrigger>
          </TabsList>
          <TabsContent value="all-dogs">Dogs</TabsContent>
          <TabsContent value="favorite-dogs">Favorite Dogs</TabsContent>
        </Tabs>
        <div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
