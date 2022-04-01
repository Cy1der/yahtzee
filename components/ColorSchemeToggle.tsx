import { ActionIcon, Group, useMantineColorScheme } from "@mantine/core";
import { Sun, MoonStars } from "tabler-icons-react";

export default function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      size="xl"
      color={dark ? "yellow" : "blue"}
      title="Toggle color scheme"
    >
      {dark ? <Sun size={30} /> : <MoonStars size={30} />}
    </ActionIcon>
  );
}
