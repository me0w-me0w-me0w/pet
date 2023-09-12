# P E T

> alias pet="deno run --allow-read --allow-net index.ts"
package manager for tools created by VOID


- self install pet in ~/.void Dir
- Able to List All Avaiable Tools by Void 
- able to install Tools in ~/.void Dir
- Able to List Installed Tools in ~/.void Dir


## Install

```sh
mkdir ~/.void
curl --output ~/.void/pet "https://github.com/username/repo/pet.exe"
chmod +x pet
write `alias pet="/home/user/.void/pet"` into .bashrc or .zshrc
```

- All the packages will be installed in .void Folder


## Dev

### Change Links
```env
REPO /pet.setup.ts
pets_record /pet.ts
repo /pets.json
```


#### Create Bash App
```sh
shc -f index.sh
```

#### Create Deno App
```sh
deno run dev
deno compile --allow-read --allow-write --allow-net --allow-run index.ts
alias pet="deno run --allow-read --allow-net --allow-write --allow-run --allow-env index.ts"
```

#### Create Bun App
```sh
bun compile
```


```
~/.void/<pkg>
pet add <pkg>
pet remove <pkg>
pet launch <pkg>
```

- githubPageDeploy : ask repo , ask dist_dir , ask Pkg_Manager
- Calculator : 
- Joke
```yml
{
  error: false,
  category: "Programming",
  type: "twopart",
  setup: "Why did the programmer quit his job?",
  delivery: "Because he didn't get arrays.",
  flags: {
    nsfw: false,
    religious: false,
    political: false,
    racist: false,
    sexist: false,
    explicit: false
  },
  id: 16,
  safe: true,
  lang: "en"
}
```

---

# Website
- ref : https://astro-milky-way.netlify.app/