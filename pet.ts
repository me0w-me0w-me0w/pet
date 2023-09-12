import { colors } from "https://deno.land/x/cliffy@v1.0.0-rc.3/ansi/colors.ts";
import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.3/command/mod.ts";

const user = Deno.env.get("HOME")
const api = "https://v2.jokeapi.dev/joke/Programming "
let pets_record = "https://www,github.com/username/repo/pets.json"

let Update = async () => {
    console.log(colors.bold("Updating"))
    // Fetch Record
    const res = await fetch(api);
    const data = await res.text();
    const write = await Deno.writeTextFile('./pets.json', data);
    // write.then(() => console.log("File written to ./hello.txt"));
    // Write into pets.json
    setTimeout(() => console.log("--- Done"), 1000);
}

let List = async (opt) => {
    // Pkg All
    if (opt.all) {
        // echo: List All
        console.log(colors.bold.underline("\nList All availabe Packages\n"))
        // read .json as JSON into txt
        let txt = JSON.parse(await Deno.readTextFile('./pets.json'));
        txt.map((x:any)=>{
            console.log(x.name);
        })
    } else if (opt.install) {
        // Pkg Install
        console.log(colors.bold.underline("\nList all Installed Packages\n"))

        const dirNames: string[] = [];
        for await (const dirEntry of Deno.readDir(`${user}/.void`)) {
            // console.log(dirEntry)
            if (dirEntry.isDirectory) {
                dirNames.push(dirEntry.name);
            }
        }
        console.log(dirNames);
        // dirNames.map((x)=>  console.log(x) )

    } else {
        console.log("Try '-h' at the end")
    }
}

let Add = async (args) => {
    //: console.log("Pet : " + args)
    // Does this pkg exist
    let txt = JSON.parse(await Deno.readTextFile('./pets.json'));
    let pkg = txt.find((x: any) => {
        if (x.name === args) {
            console.log(x)
            return x
        }
    })
    // If yes install it
    if (pkg != undefined) {
        // 1. Create MyFile > 2. Fetch PkgFile > 3. Write it into MyFile
        // 1.
        console.log(pkg.repo)
        const mkdir = Deno.run({ cmd: ["touch", pkg.name] });
        await mkdir.status();
        // 2. & 3.
        const res = await fetch(pkg.repo);
        const file = await Deno.open(`./${pkg.name}`, { create: true, write: true })
        await res.body ? .pipeTo(file.writable);
        // Permision to be executable
        const chmod = Deno.run({ cmd: ["chmod", "+x", pkg.name] });
        await chmod.status();
        // file.close(file.rid);
    } else {
        // If doent exist : warn about it
        console.log(`Package ${args} is not installed`)
        console.log(`Try 'pet list -a' : To see all the avaiable Packages`)
    }
}

let Remove = async (args) => {
    // Get All Files
    const pkgName: string[] = [];
    let path = './'
    for await (const dirEntry of Deno.readDir(path)) {
        // console.log(dirEntry)
        if (dirEntry.isFile) {
            pkgName.push(dirEntry.name);
        }
    }
    // Find the Pkg to be removed 
    let remove_pkg = pkgName.find((x) => {
        return x == args
    })
    // Does the File exists
    if (remove_pkg != undefined) {
        // const rm = Deno.run({ cmd: ["rm", remove_pkg] });
        // await rm.status();
        const rm = await Deno.remove(remove_pkg)
    } else {
        // war: The Given package is not installed or does not exists !
    }
}

await new Command()
    //--- Main command.
    .name("Pet")
    .version("0.1.0")
    .description("Package Manager to handle tool created by Void")
    //--- Joke
    .command("joke", "Add sub-command.")
    .option("-j", "Programming Jokes option.")
    .action(async (options, ...args) => {
        const res = await fetch('https://v2.jokeapi.dev/joke/Programming');
        const data = await res.json();
        console.log(`-------------------------- \n| Category : ${data.category} | \n--------------------------`)
        console.log("> " + data.setup)
        setTimeout(() => console.log(": " + data.delivery), 3000);
    })
    //--- Update Pet Record
    .command("update", "List Packages.")
    // .globalOption("-u, --update", "List all Packages.")
    .action(async (opt) => {
        await Update()
    })
    //--- List Packages
    .command("list", "List Packages.")
    .option("-a, --all", "List all Packages.")
    .option("-i, --install", "List Installed Packages.")
    .action(async (opt) => {
        await List(opt)
    })
    //--- Add
    .command("add", "add sub-command.")
    .option("-a, --add", "Bar option.")
    .arguments("<input:string>")
    .action(async (options, ...args) => {
        await Add(args[0])
    })
    //--- Remove
    .command("remove", "Remove sub-command.")
    .option("-r, --remove", "Bar option.")
    .arguments("<input:string>")
    .action(async (options, ...args) => {
        await Remove(args[0])

    })
    .parse(Deno.args);

