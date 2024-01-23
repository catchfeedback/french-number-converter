class FrenchNumberConverter {
  static DIZAINE_NAMES = [
    "",
    "",
    "vingt",
    "trente",
    "quarante",
    "cinquante",
    "soixante",
    "soixante",
    "quatre-vingt",
    "quatre-vingt",
  ];
  static UNITE_NAMES_1 = [
    "",
    "un",
    "deux",
    "trois",
    "quatre",
    "cinq",
    "six",
    "sept",
    "huit",
    "neuf",
    "dix",
    "onze",
    "douze",
    "treize",
    "quatorze",
    "quinze",
    "seize",
    "dix-sept",
    "dix-huit",
    "dix-neuf",
  ];
  static UNITE_NAMES_2 = [
    "",
    "",
    "deux",
    "trois",
    "quatre",
    "cinq",
    "six",
    "sept",
    "huit",
    "neuf",
    "dix",
  ];

  static convertZeroToHundred(number) {
    const dizaine = Math.floor(number / 10);
    let unite = number % 10;
    let liaison = "";

    if ([1, 7, 9].includes(dizaine)) {
      unite += 10;
    }

    if (dizaine > 1) {
      liaison = "-";
    } else if (unite === 1 && dizaine !== 8) {
      liaison = " et ";
    } else if (unite === 11 && dizaine === 7) {
      liaison = " et ";
    }

    const dizainePart =
      dizaine === 8 && unite === 0
        ? this.DIZAINE_NAMES[dizaine]
        : this.DIZAINE_NAMES[dizaine] + liaison;
    const unitePart = this.UNITE_NAMES_1[unite];

    return dizainePart + unitePart;
  }

  static convertLessThanOneThousand(number) {
    const centaines = Math.floor(number / 100);
    const reste = number % 100;
    const sReste = this.convertZeroToHundred(reste);

    if (centaines === 0) {
      return sReste;
    }
    if (centaines === 1) {
      return `cent${reste > 0 ? " " + sReste : ""}`;
    }
    return `${this.UNITE_NAMES_2[centaines]} cent${
      reste > 0 ? " " + sReste : "s"
    }`;
  }

  static getSegment(number, start, end) {
    return parseInt(
      number.toString().padStart(12, "0").substring(start, end),
      10
    );
  }

  static convertSegmentToWords(number, singular, plural) {
    if (number === 0) return "";
    return (
      this.convertLessThanOneThousand(number) +
      (number === 1 ? ` ${singular} ` : ` ${plural} `)
    );
  }

  static convert(number) {
    if (number === 0) {
      return "zero";
    }

    const milliards = this.getSegment(number, 0, 3);
    const millions = this.getSegment(number, 3, 6);
    const centMille = this.getSegment(number, 6, 9);
    const mille = this.getSegment(number, 9, 12);

    const tradMilliards = this.convertSegmentToWords(
      milliards,
      "milliard",
      "milliards"
    );
    const tradMillions = this.convertSegmentToWords(
      millions,
      "million",
      "millions"
    );
    const tradCentMille =
      centMille === 0
        ? ""
        : centMille === 1
        ? "mille "
        : this.convertLessThanOneThousand(centMille) + " mille ";
    const tradMille = this.convertLessThanOneThousand(mille);

    return tradMilliards + tradMillions + tradCentMille + tradMille;
  }
}

module.exports = FrenchNumberConverter;
