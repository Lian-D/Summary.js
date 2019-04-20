# Artice Trimmer
I'm editing this so it's not static. This code is not that great it's mainly used for the github site as a tool for myself. I'm currently rewriting a good amount so that it can be modular.

# How it works
- Grab the top keywords by hashing the words and scoring frequency ignoring stopwords.
- Split the article into paragraphs
- Within each paragraph split by sentence and score the sentence based on frequency of stopwords and inclusion of keywords
- return each level recursively until we get a fully trimmed article

# Usage
- currently it's just textSummary(str) that returns all the data appended together.

# Sources
Erkan, Gunes & Radev, Dragomir. (2011). LexRank: Graph-based Lexical Centrality As Salience in Text Summarization. Journal of Artificial Intelligence Research - JAIR. 22. 10.1613/jair.1523. 

Rose, Stuart & Engel, Dave & Cramer, Nick & Cowley, Wendy. (2010). Automatic Keyword Extraction from Individual Documents. 10.1002/9780470689646.ch1. 
