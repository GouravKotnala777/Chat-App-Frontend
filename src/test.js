

class Shinobi{
    constructor(name, fatherName, motherName, claneName, powers, elements){
        this.name = name;
        this.fatherName = fatherName;
        this.motherName = motherName;
        this.claneName = claneName;
        this.powers = powers;
        this.elements = elements;
    }

    getFamilyDetailes(){
        console.table([this.name, this.fatherName, this.motherName]);
    }

    getFightingDetailes(){
        console.table([this.elements, this.powers]);
    }
}

const naruto = new Shinobi("naruto", "minato", "kushina", "uzumaki", ["nine tail chakra", "sage of six path"], "wind");

naruto.getFamilyDetailes();
// naruto.getFightingDetailes();