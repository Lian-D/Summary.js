
function gist() {
    alert("Analyzing");
    const input = document.getElementById('paragraph').value;
    var arrList = splitStringIntoArray(input);
    var  gist = analyzeArrayforStopWords(arrList).join("");
    // var gist = output[0];
    alert(gist)

    document.getElementById('gist').value = gist;
}

//splits the string into substrings by sentence
function splitStringIntoArray(str) {
    var inputArray = str.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|")
    return inputArray;
}

//checks the sentences for substrings that contain stop words
function analyzeArrayforStopWords(arr) {
    //stop words, extracted from http://snowball.tartarus.org/algorithms/english/stop.txt
    var stopWords = ["i","me","mine","myself","we", "us", "ourselves ",
        "ours ", "our ", "you ", "your", "yours ", "yourself", "yourselves ","he","himself",
        "it ","its ","itself ","they","them ","their ","theirs ","themselves ","what",
        "which","who","whom","this","that", "these","those", "am", "is", "are", "was",
        "were","be", "been", "being", "have", "has", "had", "having", "do", "does", "did",
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
        "nor", "not", "only", "own", "same", "so", "than", "too", "very", "the"];
    //Initialize and empty list
    var output = [];
    for (var i= 0; i< arr.length; i++) {
        if (containsAny(arr[i].trim().toLowerCase(), stopWords)){
            output.push(arr[i]);
        }
    }
    return output;
}

function containsAny(str, arr) {
    var contains = true
    for (var i = 0; i < arr.length; i++){
        if (str.includes(arr[i]+" ")){
            contains = false;
            return contains;
        }
    }
    return contains;

    // for (var i = 0; i != arr.length; i++){
    //     var substring = arr[i];
    //     if (str.indexOf(substring) != - 1){
    //         return false
    //         }
    //     }
    //     return true
}

