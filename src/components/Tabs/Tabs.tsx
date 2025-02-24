import {
  Tabs as ShadTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { AllDogsTab } from "./AllDogsTab";
import { FavoriteDogsTab } from "./FavoriteDogsTab";

import { useFavorites } from "@/hooks";

const Tabs = () => {
  const { toggleFavorite } = useFavorites();

  return (
    <ShadTabs
      defaultValue="all-dogs"
      className="py-4 w-full flex items-center md:w-[400px]"
    >
      <TabsList>
        <TabsTrigger value="all-dogs">All Dogs 🐕</TabsTrigger>
        <TabsTrigger value="favorite-dogs">Favorite Dogs ❤️</TabsTrigger>
      </TabsList>
      <TabsContent value="all-dogs">
        <AllDogsTab />
      </TabsContent>
      <TabsContent value="favorite-dogs">
        <FavoriteDogsTab onFavoriteClick={toggleFavorite} />
      </TabsContent>
    </ShadTabs>
  );
};

export default Tabs;
