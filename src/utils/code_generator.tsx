export default function codeGenerator(): string{
    const characters = "qwertyuiopasdfghjklzcxvbnm";
    let res = "";
    for(let i=0; i<11; i++){
        if(i===3 || i===7) res+='-';
        else{
            res += characters[Math.floor(Math.random() * characters.length)]
        }
    }
    return res;
}