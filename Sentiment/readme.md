# Sentiment Analysis Source Codes

## Sentiment LSTM
Sentiment LSTM models are found in sentana.ipynb and sentiment.ipynb<br /> 

## Aspect Based ABSA
Aspect based(ABSA) can be found in sentiment.ipynb<br /> 

## NER
NER used in ABSA is in Named_Entity_Recognition.ipynb, this contain a LSTM and BERT transfer learning model (BERT was used in sentiment.ipynb)<br /> 
<br /> 

## MLP
train_sentiment_new.ipynb is the codes used for training MLP model on ood data <br />
tokenizer.pickle is used to form the incidence matrix for neutral vs opiniated, tokenizer_opi.pickle is that used for positive vs negative for the MLP model<br /> 
classification.ipynb is used with the model trained in train_sentiment_new to produce labelling <br /> 
accuracy.ipynb is used to calculate accuracy of automatic labelling against manual labelling <br /> 

## Training Data
Training data used is in train folder in main directory<br /> 

## Labeled Test Sets
Labelled test sets are in Dataset folder in main directory
