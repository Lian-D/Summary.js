//Global Variable of Topwords
let topWords = [];

//Global Variable of Stop Words
const stopWords = ["I", "me", "mine", "myself", "we", "us", "ourselves ",
    "ours", "our", "you", "your", "yours ", "yourself", "yourselves ", "he", "himself",
    "it", "its", "itself", "they", "them ", "their ", "theirs ", "themselves ", "what",
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
    "nor", "not", "only", "own", "same", "so", "than", "too", "very", "a", "s", "the", "The", "IT", "it", "S", "'s"];

//Global Variable of Characters
let characterCount = 0;

//Global Variable for Post Characters
let summaryCount = 0;

//Effects: Summarizes the text and returns a string of said summary
function textSummary(input) {
    characterCount = input.length;
    topWords = getTopNWords(input, 4);
    var finalSummary = [];
    var paragraphArray = input.split(/\n/).filter(v => v !== "");

    for (var i = 0; i < paragraphArray.length; i++) {
        finalSummary.push(paragraphSummary(paragraphArray[i]));
    }
    var summary = finalSummary.join("\n");
    summaryCount = summary.length;
    return ("KEYWORDS: ").concat(topWords.join(", ")+("\nReduced by: "+Math.ceil(100 - (10*(characterCount / summaryCount)))+"% ")+ "\n ======================================================================================================\n \nSummary: " + summary);
}

//Effects Summarizes an individual paragraph of text
function paragraphSummary(paragraph) {
    var stringFreqStopStringMap = new Map([]);
    var sentenceLength = 0
    var firstSentence = null;

    //splits the article into sentences and replaces common abbreviations.
    paragraph = paragraph.replace(" U.S.", " US");
    paragraph = paragraph.replace(" Dr.", " Dr");
    paragraph = paragraph.replace(" Mr.", " Mr");
    paragraph = paragraph.replace(" Ms.", " Ms");
    paragraph = paragraph.replace(" Mrs.", " Mrs");
    paragraph = paragraph.replace(" Gen.", " General");
    paragraph = paragraph.replace(" Sen.", " Senator");
    paragraph = paragraph.replace(".)", ").");
    var arrList = splitStringIntoSentenceArray(paragraph);

    //Take the list of stop words and analyzes them for whether or not they contain any stop words
    analyzeArrayforStopWords(arrList);
    //Spaces the sentence to make it cohesive again
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

        for (var i = 0; i < arr.length; i++) {
            var stopScore = scoreSentence(arr[i], stopWords);
            //Score is classifed as a map that contains [stopscore, <sentence>}
            stringFreqStopStringMap.set(stopScore, arr[i]);
        }
    }

    function scoreSentence(str, arr) {
        var strValue = 0;
        for (var i = 0; i < arr.length; i++) {
            //If it does not include the stop-words , then we increase the score for the array.
            if (!str.includes(arr[i])) {
                strValue++
            }
        }
        for (var i = 0; i < topWords.length; i++) {
            //If it contains a keyword, then we increase the score for the array by 2.
            if (str.includes(arr[i])) {
                strValue++;
                strValue++;
            }
            return strValue;
        }
    }
    //returns an array of the lowest
        function returnArrayOfLowestScores() {
            var finalArrayValues = []

            for (var i = 0; i < Math.ceil((sentenceLength / 3)); i++) {
                var maxkey = Math.max(...stringFreqStopStringMap.keys());
                finalArrayValues.push(stringFreqStopStringMap.get(maxkey));
                stringFreqStopStringMap.delete(maxkey);
            }
            return finalArrayValues;
        }
}
    function getTopNWords(text, n) {
        var wordRegExp = /\w+(?:'\w{1,2})?/g;
        var words = {};
        var matches;

        for (var i = 0; i< stopWords.length; i++){
            text = text.replace(new RegExp(" "+stopWords[i]+" ", "g"), " ");
        }

        while ((matches = wordRegExp.exec(text)) != null) {
            var word = matches[0].toLowerCase();
            if (typeof words[word] == "undefined") {
                words[word] = 1;
            } else {
                words[word]++;
            }
        }

        var wordList = [];
        for (var word in words) {
            if (words.hasOwnProperty(word)) {
                wordList.push([word, words[word]]);
            }
        }
        wordList.sort(function (a, b) {
            return b[1] - a[1];
        });

        var topWords = [];
        for (var i = 0; i < n; i++) {
            topWords.push(wordList[i][0]);
        }
        for (var i =0; i < topWords.length-1; i++){
            if (topWords[i] == "s"){
                topWords.splice(i,1);
            }
        }
        return topWords
    }
