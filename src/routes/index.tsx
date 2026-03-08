import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user.id) {
      throw redirect({ to: "/$userId", params: { userId: user.id } });
    }

    throw redirect({ to: "/signin" });
  },
});
