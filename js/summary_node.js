//Array of stop words within the english language
const stopwordsArr = ["a", "about", "above", "above", "across", "after",
    "afterwards", "again", "against", "all", "almost", "alone",
    "along", "already", "also","although","always","am","among",
    "amongst", "amoungst", "amount",  "an", "and", "another",
    "any","anyhow","anyone","anything","anyway", "anywhere",
    "are", "around", "as",  "at", "back","be",
    "became", "because","become","becomes", "becoming",
    "been", "before", "beforehand", "behind", "being",
    "below", "beside", "besides", "between", "beyond",
    "bill", "both", "bottom","but", "by", "call", "can",
    "cannot", "cant", "co", "con", "could", "couldnt",
    "cry", "de", "describe", "detail", "do", "done",
    "down", "due", "during", "each", "eg", "eight", "either",
    "eleven","else", "elsewhere", "empty", "enough", "etc", "even",
    "ever", "every", "everyone", "everything", "everywhere", "except",
    "few", "fifteen", "fify", "fill", "find", "fire", "first", "five",
    "for", "former", "formerly", "forty", "found", "four", "from", "front",
    "full", "further", "get", "give", "go", "had", "has", "hasnt", "have",
    "he", "he's", "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon",
    "hers", "herself", "him", "himself", "his", "how", "however", "hundred",
    "ie", "if", "in", "inc", "indeed", "interest", "into", "is", "it", "its",
    "itself", "keep", "last", "latter", "latterly", "least", "less", "ltd", "made",
    "many", "may", "me", "meanwhile", "might", "mill", "mine", "more", "moreover",
    "most", "mostly", "move", "much", "must", "my", "myself", "name", "namely",
    "neither", "never", "nevertheless", "next", "nine", "no", "nobody", "none",
    "noone", "nor", "not", "nothing", "now", "nowhere", "of", "off", "often",
    "on", "once", "one", "only", "onto", "or", "other", "others", "otherwise",
    "our", "ours", "ourselves", "out", "over", "own","part", "per", "perhaps",
    "please", "put", "rather", "re", "same", "see", "seem", "seemed", "seeming",
    "seems", "serious", "several", "she", "she's", "should", "show", "side", "since", "sincere",
    "six", "sixty", "so", "some", "somehow", "someone", "something", "sometime", "sometimes",
    "somewhere", "still", "such", "system", "take", "ten", "than", "that", "the", "their", "them",
    "themselves", "then", "thence", "there", "thereafter", "thereby", "therefore", "therein", "thereupon",
    "these", "they", "thick", "thin", "third", "this", "those", "though", "three", "through", "throughout",
    "thru", "thus", "to", "together", "too", "top", "toward", "towards", "twelve", "twenty", "two", "un", "under",
    "until", "up", "upon", "us", "very", "via", "was", "we", "well", "were", "what", "whatever", "when", "whence",
    "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which",
    "while", "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", "with", "within", "without", "would",
    "yet", "you", "your", "yours", "yourself", "yourselves", "the"];
    
const abbExceptions= [{abb: "Dr.", fix: "Dr "},
    {abb: "Mr\.", fix: "Mr"},{abb: "Sen\.", fix: "Senator"},
    {abb: "Mrs\.", fix: "Mrs"}, {abb: "Ms\.", fix: "Ms"},
    {abb: "PHD\.", fix: "PHD"}, {abb: "U\.S", fix: "US"},
    {abb: "U\.S\.A", fix: "USA"}, {abb: "U\.S\.", fix: "US"},
    {abb: "Gen\.", fix: "General"}, {abb: "Col\.", fix: "Colonel"}];

const wordReg = /\w+(?:'\w{1,2})?/g;
const sentenceReg = /(\.+|\!|\?)(\"*|\'*|\)*|}*|]*)(\s|\n|\r|\r\n)/gm;

/**
 * Creates the Sentence object
 * @Author Lian Duan
 * @Param string string value of sentence
 * @Param index chronological index of function
 */
function Sentence(string, index, score){
    this.content = string;
    this.sentenceIndex = index;
    this.score = score;
}

function Summary(text, keywordsArr, characterSummed, characterOrig){
    this.keywords = keywordsArr;
    this.text = text;
    this.characterSummed = characterSummed;
    this.characterOrig = characterOrig;
    this.reductionfactor = 100-(characterSummed/characterOrig)*100;
}
/**
 * Sanitizes the text of certain strings
 * @Author Lian Duan
 * @Param text the article in question
 * @Param string the string that we are sanitizing
 * @return a sanitized string
 */
function sanitizeString(text, string){
    //This uniquely works to get rid of the strings
    //eg. santizeString("The cow jumped over the fence", "the) => "cow jumped over fence"
    var pattern = " "+string+" ";
    var regex = new RegExp(pattern, "gi");
    var sanitized = text.replace(regex, " ");
    return sanitized;
}
function sanitizeForSpecificValue(text, value){
    var pattern = " "+value.abb+" ";
    var regex = new RegExp(pattern, "gi");
    var sanitized = text.replace(regex, " "+value.fix+" ");
    return sanitized;
}
/**
 * Returns an array of keywords
 * @Author Lian Duan
 * @Param text the article in question
 * @Param n number of keywords requested
 * @return an array of keywords
 */
function getKeywords(text, n) {
    var words = {};
    var matches;
    //Sanitizes the string from having any sort of stop words.
    stopwordsArr.forEach( (string) => {
        text = sanitizeString(text, string);
    });
    while ((matches = wordReg.exec(text)) != null) {
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
    console.log(topWords);
    return topWords
}
//splits the string into substrings by sentence
function splitStringIntoSentenceArray(text) {
    var inputArray = text.replace(sentenceReg, "$1|").split("|");;
    return inputArray;
}
function scoreSentence(sentence, keywords){
    stopwordsArr.forEach( (stopword) => {
        if (sentence.content.includes(" "+stopword+" ")){
            sentence.score = sentence.score - 0.25;
        }
    });
    keywords.forEach( (keyword) => {
        if (sentence.content.includes(" "+keyword+" ")){
            sentence.score = sentence.score + 2;
        }
    });
return sentence;
}
/**
 * Summarizes based on parameters
 * @Author Lian Duan
 * @Param text the article in question 
 * @Param sentences the amount of sentences we want
 * @Param the amount of keywords we want
 * @return Summary summary based on specifications
 */
var summarize = function(text, sentences, keywordsInt){
    text = text.replace(/[\n\r]/g, "");
    var textCount = text.split(' ').length;
    var keywords = getKeywords(text, keywordsInt);
    //Quickly sanitizes the string for exceptions
    abbExceptions.forEach( (value) => {
        text = sanitizeForSpecificValue(text, value);
    });
    //Split into sentences values
    var sentence_arr = splitStringIntoSentenceArray(text);
    var sentenceObj_Arr = [];
    var index = 0;
    //Create Sentence objects
    sentence_arr.forEach( (sentence) => {
        sentenceObj_Arr.push(new Sentence(sentence, index, 0));
        index++;
    });
    //Scores all sentences
    for (var i = 0; i <sentenceObj_Arr.length; i++){
        sentenceObj_Arr[i] = scoreSentence(sentenceObj_Arr[i], keywords);
    }
    //Sorts the array by lowest to largest values
    sentenceObj_Arr.sort((a, b) => parseFloat(a.score) - parseFloat(b.score));
    sentenceObj_Arr = sentenceObj_Arr.slice(sentenceObj_Arr.length - sentences, sentenceObj_Arr.length);
    sentenceObj_Arr.sort((a, b) => parseFloat(a.sentenceIndex) - parseFloat(b.sentenceIndex));
    //Delete useless vars
    delete sentence_arr;
    delete index;
    console.log(sentenceObj_Arr);
    var summarytext = "";
    sentenceObj_Arr.forEach( (sentence) => {
        summarytext = summarytext+sentence.content+"\n";
    });
    var summary = new Summary(summarytext,keywords, summarytext.split(' ').length, textCount);
    return summary;
};
module.exports = summarize;