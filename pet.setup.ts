// 1. Create .void in Home
// 2. install pet.ts & pet.json in it
// 3, echo alias pet = "alias pet="deno run --allow-read --allow-net --allow-write --allow-run --allow-env pet.ts"" into your .bashrc or .zshrc
import { exists, existsSync } from "https://deno.land/std/fs/mod.ts";
const REPO = "https://blog.logrocket.com/understanding-denos-file-system/#checkingifafileexists"
const user = Deno.env.get("HOME")
const dir = `${user}/.void`
const dir_exist = await exists(dir)

if (dir_exist) {
    console.log(`${dir}/pets.ts`)
    const touch = Deno.run({ cmd: ["touch", `${dir}/pet.ts`] });
    // const curl = await Deno.run({ cmd: ["curl ", repo, "--output", `${dir}/pets.ts`] });
    const res = await fetch(repo);
    const file = await Deno.open(`${dir}/pet.ts`, { create: true, write: true })
    await res.body ? .pipeTo(file.writable);
} else {
    const mkdir = Deno.run({ cmd: ["mkdir", dir] });
    const touch = Deno.run({ cmd: ["touch", `${dir}/pet.ts`] });
    const res = await fetch(repo);
    const file = await Deno.open(`${dir}/pet.ts`, { create: true, write: true })
    await res.body ? .pipeTo(file.writable);
}