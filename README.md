# AssemblyScript

# Mis on AssemblyScript?

AssemblyScript on programmeerimiskeel, mis sündis WebAssembly tulekuga. Ta põhineb TypeScripti keele peal. TypeScript omakorda põhineb JavaScripti peal ning lisab keelele tüüpe. AssemblyScript on loodud selleks, et TypeScripti süntaksiga koodi oleks võimalik kompileerida WebAssembly koodiks - see võimaldab importida juba eelnevalt kompileeritud ja optimeeritud koodi otse olemasoleva JavaScript koodi.

AssemblyScript on ainulaadne selle poolest, et see võimaldab JavaScripti ja TypeScripti tundvatel veebiarendajatel kirjutada koodi, mis suudab WebAssemblyt sihtida ilma uut keelt õppimata.

# Miks just AssemblyScript?

AssemblyScript on suunatud veebiarendajatele, kes soovivad oma projektides kasutada WebAssembly'i võimsust ja potentsiaali, ilma TypeScripti/JavaScripti mugavust ja omakorda tootlikust ohverdamata. Seega esimene eelis võrreldes teistega on veebiarendajatele tuttav süntaks.

Üks teine eelis võrreldes teiste WebAssembly'ile kompileerimisvõimeliste tööriistakettidega, näiteks Rustil põhinevate tööriistakettide ja Emscripteniga, on selle lihtsus ja kasutusmugavus. AssemblyScript ei nõua raskeid tööriistahelaid ega keerulisi seadistamisprotsesse. Seda saab paigaldata npm-i abil ja integreerida olemasolevatesse töövoogudesse. AssemblyScriptil on ka kõrgetasemeline süntaks, mis sarnaneb JavaScriptile ja TypeScriptile - see teeb selle veebiarendajatele kättesaadavamaks ja intuitiivsemaks, kui keeled nagu C või Rust.

# Koodivõrdlus TypeScripti ja JavaScriptiga

AssemblyScript kasutab WebAssembly sissehitatud tüüpe ning on rangem kui TypeScript (näiteks, ei ole võimalik tekitada funktsiooni, mis tagastab `any`). Näidiseks on lihtne funktsioon, mis genereerib juhusliku arvu antud piirkonna vahel.


## JavaScript

```js
function random(min, max) {
  const ranges = max - min + 1;
  const num = Math.floor(Math.random() * ranges) + min;
  return num;
}
```

## TypeScript
```ts
export function random(min: number, max: number) {
  const ranges = max - min + 1;
  const num = Math.floor(Math.random() * ranges) + min;
  return num;
}
```

## AssemblyScript
```ts
export function random(min: i32, max: i32): i32 {
  const ranges = max - min + 1;
  const num = Math.floor(Math.random() * ranges) + min;
  return num;
}
```

AssemblyScript süntaks on veidi erinev, kuna esiteks siinkohal kasutatakse WebAssembly tüüpe (i32 ehk 32-bitine number). Juhusliku arvu ümardamiseks täisarvuks selle asemel, et kasutada `Math.floor()` funktsiooni, valitakse lõpus konkreetset tüüpi.

Siinkohal peab märkima, et AssemblyScriptiga on võimalik teha pisioptimisatsioone. Näiteks selle asemel, et kasutada `Math.floor()` arvu ümardamiseks, saab ka lihtsalt teisendada tüübi (ehk *type casting*). Ujukomaarvu andmetüüpi täisarvuks teisendamine on lihtne ja kiire toiming, samas kui funktsiooni `Math.floor()` kutsumine nõuab rohkem üldkulusid ja on seetõttu aeglasem.

```ts
export function random(min: i32, max: i32): i32 {
  const ranges = max - min + 1;
  const num = (Math.random() * ranges) + min;
  return <i32>num;
}
```

# Paigaldamine

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



# Arendus

## AssemblyScript funktsioonid JavaScriptis

## JavaScript funktsioonid AssemblyScriptis

## Keerulised tüübid




