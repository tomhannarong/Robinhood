import { redirect } from "next/navigation";
import { URL_LOGIN } from "./constants";

export default function Home() {
  redirect(URL_LOGIN);
}
