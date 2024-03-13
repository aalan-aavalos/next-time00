"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Button from "@mui/material/Button";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/adm/usrs");
  };
  return (
    <div>
      <h1>Home</h1>
      <Button variant="contained" onClick={handleClick}>
        Admin view
      </Button>
    </div>
  );
}
