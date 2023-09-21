// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ["A", "T", "C", "G"];
    return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
    const newStrand = [];
    for (let i = 0; i < 15; i++) {
        newStrand.push(returnRandBase());
    }
    return newStrand;
};
const pAequorFactory = (specimenNum, dna) => {
    return {
        _specimenNum: specimenNum,
        _dna: dna,
        mutate() {
            this._dna = mockUpStrand();
            let j = this._dna[0];
            for (let i = 1; i < this._dna.length; i++) {
                if (j === this._dna[i]) {
                    let k = returnRandBase();
                    while (j === k) {
                        k = returnRandBase();
                    }
                    this._dna[i] = k;
                }
                j = this._dna[i];
            }
            return this._dna;
        },
        compareDNA(compDNA) {
            let sameCount = 0;
            let x = 0;
            for (base of compDNA) {
                if (base === this.dna[x]) {
                    sameCount++;
                }
                x++;
            }
            return Math.round((sameCount / compDNA.length) * 100);
        },
        willLikelySurvive() {
            let survive = 0;
            for (base of this.dna) {
                if (base === 'C' || base === 'G') {
                    survive++;
                }
            }
            if (survive / this.dna.length >= 0.6) {
                return true;
            }
            else {
                return false;
            }
        },
        set dna(dna) {
            this._dna = dna;
        },
        set specimenNum(specimenNum) {
            this._specimenNum = specimenNum;
        },
        get dna() {
            return this._dna;
        },
        get specimenNum() {
            return this._specimenNum;
        }
    };
};
let dnaSurviverSamples = [];
let sample = pAequorFactory();
let i = 1;
while (i <= 30) {

    sample = pAequorFactory(i, pAequorFactory().mutate());

    if (sample.willLikelySurvive()) {
        dnaSurviverSamples.push(sample);
        i++;
    }
}
const strand = pAequorFactory().mutate();
console.log(strand);