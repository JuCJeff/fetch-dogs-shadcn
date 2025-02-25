import { LogoutButton } from "../components/Authentication/LogoutButton";
import { Tabs } from "../components/Tabs";

export default function SearchPage() {
  return (
    <div>
      <div className="flex flex-col sticky top-0 py-8 w-full">
        <h1>Search Page</h1>
        <Tabs />
        <div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
