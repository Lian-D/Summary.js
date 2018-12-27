function textSummary(input) {
    var finalSummary = [];
    var paragraphArray = input.split(/\n \n /).filter(v => v !== "");

    for (var i = 0; i < paragraphArray.length; i++) {
        finalSummary.push(paragraphSummary(paragraphArray[i]));
    }
    var summary = finalSummary.join("\n");
    return summary;
}

function paragraphSummary(paragraph) {
    var stringFreqStopStringMap = new Map([]);
    var sentenceLength = 0
    var firstSentence = null;

    //splits the article into sentences and replaces common Abbreivations
    paragraph = paragraph.replace(" U.S.", "US");
    paragraph = paragraph.replace(" Dr.", " Dr");
    paragraph = paragraph.replace(" Mr.", " Mr");
    paragraph = paragraph.replace(" Ms.", " Ms");
    paragraph = paragraph.replace(" Mrs.", " Mrs");
    paragraph = paragraph.replace(" Gen.", " General");
    var arrList = splitStringIntoSentenceArray(paragraph);

    //Take the list of
    analyzeArrayforStopWords(arrList);
    var gist = (firstSentence + " ").concat(returnArrayOfLowestScores().join(" "));

    return gist;


//splits the string into substrings by sentence
    function splitStringIntoSentenceArray(str) {
        var inputArray = str.replace((/(\.+|\!|\?)(\"*|\'*|\)*|}*|]*)(\s|\n|\r|\r\n)/gm), "$1|").split("|");

        //Grabs the first chunk of the sentence and removes it from being cycled
        firstSentence = inputArray[0]
        inputArray.shift();

        //This provides the sentence length we need.
        sentenceLength = (inputArray.length - 1);
        return inputArray;
    }

//checks the sentences for substrings that contain stop words
    function analyzeArrayforStopWords(arr) {
        //stop words, extracted from http://snowball.tartarus.org/algorithms/english/stop.txt
        var stopWords = ["i", "me", "mine", "myself", "we", "us", "ourselves ",
            "ours ", "our ", "you ", "your", "yours ", "yourself", "yourselves ", "he", "himself",
            "it ", "its ", "itself ", "they", "them ", "their ", "theirs ", "themselves ", "what",
            "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are", "was",
            "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did",
            "doing", "i'm", "you're", "he's", "she's", "it's", "we're", "they're", "i've", "you've",
            "we've", "they've", "i'd", "you'd", "he'd", "she'd", "we'd", "they'd", "i'll", "you'll",
            "she'll", "we'll", "they'll", "isn't", "aren't", "wasn't", "weren't", "hasn't", "haven't",
            "hadn't", "doesn't", "don't", "didn't", "won't", "wouldn't", "shan't", "shouldn't", "can't",
            "cannot", "couldn't", "mustn't", "let's", "that's", "who's", "what's", "here's", "there's",
            "when's", "where's", "why's", "how's", "a", "an", "and", "but", "if", "or", "because",
            "as", "until", "while", "of", "at", "by", "for", "with", "about", "against", "between", "into",
            "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "in",
            "out", "on", "off", "over", "under", "again", "then", "once", "here", "there", "when",
            "why", "how", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "no",
            "nor", "not", "only", "own", "same", "so", "than", "too", "very", "the", "a"];

        for (var i = 0; i < arr.length; i++) {
            var stopScore = scoreSentence(arr[i], stopWords);
            //Score is classifed as a map that contains [stopscore, <sentence>}
            stringFreqStopStringMap.set(stopScore, arr[i]);
        }
    }

    function scoreSentence(str, arr) {
        var strValue = 0;
        for (var i = 0; i < arr.length; i++) {
            //If it does not include the "word " or the "word.", then we increase the score for the array.
            if (!str.includes(arr[i])) {
                strValue++
            }
        }
        return strValue;
    }

    function returnArrayOfLowestScores() {
        var finalArrayValues = []

        for (var i = 0; i < Math.ceil((sentenceLength / 3)); i++) {
            var minkey = Math.min(...stringFreqStopStringMap.keys());
            finalArrayValues.push(stringFreqStopStringMap.get(minkey));
            stringFreqStopStringMap.delete(minkey);
        }
        return finalArrayValues;
    }
}
