# AssemblyScript

## Mis on AssemblyScript?

AssemblyScript on programmeerimiskeel, mis sündis WebAssembly tulekuga. Ta põhineb TypeScripti keele peal. TypeScript omakorda põhineb JavaScripti peal ning lisab keelele tüüpe. AssemblyScript on loodud selleks, et TypeScripti süntaksiga koodi oleks võimalik kompileerida WebAssembly koodiks - see võimaldab importida juba eelnevalt kompileeritud ja optimeeritud koodi otse olemasoleva JavaScript koodi.

AssemblyScript on ainulaadne selle poolest, et see võimaldab JavaScripti ja TypeScripti tundvatel veebiarendajatel kirjutada koodi, mis suudab WebAssemblyt sihtida ilma uut keelt õppimata.

## Miks just AssemblyScript?

AssemblyScript on suunatud veebiarendajatele, kes soovivad oma projektides kasutada WebAssembly'i võimsust ja potentsiaali, ilma TypeScripti/JavaScripti mugavust ja omakorda tootlikust ohverdamata. Seega esimene eelis võrreldes teistega on veebiarendajatele tuttav süntaks.

Üks teine eelis võrreldes teiste WebAssembly'ile kompileerimisvõimeliste tööriistakettidega, näiteks Rustil põhinevate tööriistakettide ja Emscripteniga, on selle lihtsus ja kasutusmugavus. AssemblyScript ei nõua raskeid tööriistahelaid ega keerulisi seadistamisprotsesse. Seda saab paigaldata npm-i abil ja integreerida olemasolevatesse töövoogudesse. AssemblyScriptil on ka kõrgetasemeline süntaks, mis sarnaneb JavaScriptile ja TypeScriptile - see teeb selle veebiarendajatele kättesaadavamaks ja intuitiivsemaks, kui keeled nagu C või Rust.

## Koodivõrdlus TypeScripti ja JavaScriptiga

AssemblyScript kasutab WebAssembly sissehitatud tüüpe ning on rangem kui TypeScript (näiteks, ei ole võimalik tekitada funktsiooni, mis tagastab `any`). Näidiseks on lihtne funktsioon, mis genereerib juhusliku arvu antud piirkonna vahel.


### JavaScript

```js
function random(min, max) {
  const ranges = max - min + 1;
  const num = Math.floor(Math.random() * ranges) + min;
  return num;
}
```

### TypeScript
```ts
export function random(min: number, max: number) {
  const ranges = max - min + 1;
  const num = Math.floor(Math.random() * ranges) + min;
  return num;
}
```

### AssemblyScript
```ts
export function random(min: i32, max: i32): i32 {
  const ranges = max - min + 1;
  const num = Math.floor(Math.random() * ranges) + min;
  return num;
}
```

AssemblyScript süntaks on veidi erinev, kuna esiteks siinkohal kasutatakse WebAssembly tüüpe (i32 ehk 32-bitine number).

Siinkohal peab märkima, et AssemblyScriptiga on võimalik teha pisioptimisatsioone. Näiteks selle asemel, et kasutada `Math.floor()` arvu ümardamiseks, saab ka lihtsalt teisendada tüübi (ehk *type casting*). Ujukomaarvu andmetüüpi täisarvuks teisendamine on lihtne ja kiire toiming, samas kui funktsiooni `Math.floor()` kutsumine nõuab rohkem üldkulusid ja on seetõttu aeglasem.

```ts
export function random(min: i32, max: i32): i32 {
  const ranges = max - min + 1;
  const num = (Math.random() * ranges) + min;
  return <i32>num;
}
```

# Paigaldamine

WebAssembly paigaldamine on võrdlemisi otsekohane ning veebiarendaja, kes on juba tuttav järgnevate Node tööriistadega, saab tunda end kohe kodus.

## Node

Paigaldamiseks on vajalik installeerida **Node**, mis tuleb kaasa koos enda **npm** pakettihaldajaga (Node Package Manager).

Node saab alla tõmmata kõikidele platformidele [Node ametlikult veebilehelt](https://nodejs.org/en/download).

Olemasolu kontrollimiseks ava käsurida ning sisesta järgmised käsud:

```bash
node -v
```

```bash
npm -v
```

## Uue projekti koostamine

Tekitame uue projekti. Selleks tee lahti tühi kaust ja sisestame käsureal järgmised käsud.

1. Koostame uue node.js mooduli:
```bash
npm init
```

2. Paigaldame AssemblyScript projekti sõltuvusena:
```bash
npm install --save-dev assemblyscript
```

3. Koostame uue AssemblyScript projekti:
```bash
npx asinit .
```

Käsk `asinit` automaatselt loob eelnevalt seadistud projekti koos oma kaustade ja failidega, mida saab kasutada algpunktina.

4. Veendume, et saame kompileerida kasutades testi:

- Installime uuesti sõltuvused
```bash
npm i
```

- Teeme WebAssembly faili imporditavaks
```bash
npm run asbuild
```

- Testime
```bash
npm test
```

Kui väljund sarnaneb järgnevaga, siis kõik toimib.

```
> hello_world@1.0.0 test
> node tests

ok
```

Kui ei toimi, siis venduge, et `node -v` versioon on v14.20 või enam.

## Funktsiooni kirjutamine

Kaustas **assembly** on olemas fail `index.ts`. Seal on juba olemas `add()` näidisfunktsioon, mida kasutatakse ka testis.

Lisame juurde lihtsa funktsiooni `hello()`, mis tagastab teksti:

```ts
//index.ts

// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function hello(): string {
  return "Hello World!";
}
```

Nüüd saame selle funktsiooni testida meie `test/index.js` failis:

```js
import assert from "assert";
import { add, hello } from "../build/debug.js";
assert.strictEqual(add(1, 2), 3);
assert.strictEqual(hello(), "Hello World!");
console.log(hello())
console.log("ok");
```

Käsurea käsk `npm run asbuild && npm test` tagastab nüüd uue funktsiooni väljundi.

## Katsetamine HTML-ist

Kui kõik on olnud edukas, siis ülaltoodud funktsioonid on nüüd lihtsasti võimalik importida oma JavaScript ja TypeScript projektides, nii nagu testfailis on juba kasutusel.

Tavalises `.js` failis peavad skriptid olema imporditud moodulitena (ehk `<script type="module">` sees).

Projekti `package.json` failis on kirjeldatud mõned skriptid - üks neist on lihtne arendusserver. Selle kasutamiseks on vaja sisestada käsureasse järgnev käsk:

```
npm start
```

Selle käsuga avatakse arendusserver portil 3000 (vaikimisi) ning avatakse projekti juurikas oleva `index.html` faili, kus on ainult välja kutsutud näidisfunktsioon.

Lisame ka meie `hello()` funktsiooni:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<script type="module">
import { add, hello } from "./build/release.js";
document.querySelector("#add").innerText = add(1, 2);
document.querySelector("#hello").innerText = hello();
</script>
</head>
<body>
    <div id="add"></div>
    <div id="hello"></div>
</body>
</html>
```



# Arendus

## Sisseehitatud funktsioonid

AssemblyScript on veebiarendajatele mugav mitte ainult tuttava süntaksi ja töövoogu tõttu, kuid ka enam-vähem tuttavate sisseehitatud funktsioonide tõttu, mis on analoogsed JavaScripti omadega.

Siin on ainult näidis sellest, kui sarnased need funktsioonid on - täiuslik nimekiri funktsioonidest on saadaval [ametlikult veebilehelt](https://www.assemblyscript.org/stdlib/globals.html).
- Math
  - Math.random()
  - Math.round()
  - Math.abs()
  - ...
- Map
  - delete
  - get()
  - has()
  - keys()
  - ...
- String
  - endsWith()
  - includes()
  - indexOf()
  - ...
- Array
  - concat()
  - filter()
  - forEach()
  - map()
  - join()
  - reverse()
  - ...

## Töötamine massiividega, lambda funktsioonid

Nii nagu JavaScript, siis AssemblyScript lubab kirjutada funktsionaalse programmeerimise stiilis funktsioone. Näiteks **arrays** asuvas kaustas on tehtud järgmine funktsioon, mis on enamjaolt analoogne oma JavaScript versioonile:

```ts
export function sum(arr: i32[]): i32 {
  return arr.reduce<i32>((a, b) => a + b, 0)
}
```

Suuremate arvude jaoks, mis ülevatad 32-bitise arvu limiidi, saab kasutada näiteks järgneva funktsiooni:

```ts
export function sumBigInt(arr: i64[]): i64 {
  return arr.reduce<i64>((a, b) => a + b, 0)
}
```

ning testis on oodatud JavaScripti BigInt tüüp:

```js
assert.strictEqual(sumBigInt([1, 5, 0, 10].map(v => BigInt(v))), BigInt(16));
```

Muud näited asuvad **arrays** kataloogis.

## Optimeerimine

AssemblyScript kompilaatori saab vajadusel ka optimeerida. Optimeerimise tõhusus ja võimalus sõltub programmist ja algoritmist. Kompileerimise käsule saab anda parameetrid, mis vahetavad välja käivituskeskkonna. Näiteks `--runtime minimal` parameeter parandab `sieveOfEratosthenes()` funktsiooni kiirust kuni 2 korda ning `bubblesort()` funktsiooni kuni kolm korda (~90 sekundilt ~30-le)

Selle kasutamiseks lihtsalt lisage sama parameeter `package.json` faili, kus kompileeritakse programmi lõppversioon ehk **release** versioon:

```json
"asbuild:release": "asc assembly/index.ts --runtime minimal --target release",
```

Optimeerimised on rakendatud pärast järgmist kompileerimist. Sama optimisatsioon on rakendatud **algorithms** kaustas.

## Millal kasutada?

Kuigi WebAssembly on teoorias kiirem, siis nende moodulite väljakutsimine on kulukam, kui tavapärase JavaScripti funktsiooni väljakutsumine. Seega enamus ajast JavaScriptis/TypeScriptis kirjutamine on täiesti piisav. Eranditeks on näiteks arvukad kalkulatsioonid ja keerulised algoritmid.

Enamjaolt on ülaltoodud massiivide funktsioonid tihtipeale kiiremad JavaScriptis, kuid neid saab kombineerida teiste keerukamate algoritmidega. Näiteks populaarne JavaScript moodulite pakkija, WebPack, võttis kasutusele AssemblyScripti, et [kiirendada räside arvutamist](https://github.com/webpack/webpack/blob/main/assembly/hash/md4.asm.ts).

## Pea meeles

- Et näha oma koodi muudatusi, peab välja kutsuma `npm run asbuild` skripti
- AssemblyScriptis on semikooloni kasutamine kohustuslik 
- AssemblyScripti saab kasutada olemasolevate TypeScript tööriistadega, näiteks linterid (ehk koodi korrastajad) või IntelliSense pluginad.
- AssemblyScript failid on `.ts`, mis võib olla veidi segane. Selle eelis on see, et vajadusel saab koodi kompileerida otse JavaScripti kasutades TypeScripti `tsc` kompilaatori. Sellest lähemalt saab lugeda [siit](https://www.assemblyscript.org/compiler.html#portability).
- Hea tava on alati testida oma koodi. See võib olla tehtud ka väliste tööriistadega nagu mocha, jest või vitest.

# Allikad
- https://www.assemblyscript.org/