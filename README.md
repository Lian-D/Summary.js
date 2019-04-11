# TextSummary
Text summarizer in Javascript
https://lian-d.github.io/TextSummary

# How it works
First we look for keywords an return the top four keywords;

The algorithm analyzes sentences based on whether or not they contain "Stop" words and scores them based on the frequency they show up with whether or not they contain keywords. 

every stop word not contained is +1
every keyword contained is +3

Then, they are compared to each other and the highest scores will be returned.


# Usage
import the script into your index or JS and call

textSummary(str) to provide a summary of said text.

# Sources
Erkan, Gunes & Radev, Dragomir. (2011). LexRank: Graph-based Lexical Centrality As Salience in Text Summarization. Journal of Artificial Intelligence Research - JAIR. 22. 10.1613/jair.1523. 

Rose, Stuart & Engel, Dave & Cramer, Nick & Cowley, Wendy. (2010). Automatic Keyword Extraction from Individual Documents. 10.1002/9780470689646.ch1. 
