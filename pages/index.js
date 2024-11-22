import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { userInfo } = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) router.push("/login");
    else router.push("/dashboard");
  }, [userInfo, router]);

  return null;
}
