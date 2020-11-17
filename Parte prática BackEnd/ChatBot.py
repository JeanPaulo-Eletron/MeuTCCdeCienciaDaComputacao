import numpy as np
import tensorflow as tf
import re
import time
import os

# Pré Processamento dos dados

linhas    = open(os.path.dirname(__file__)+'\Arquivos\Base da dados\movie_lines.txt', encoding='utf-8', errors='ignore').read().split('\n')
conversas = open(os.path.dirname(__file__)+'\Arquivos\Base da dados\movie_conversations.txt', encoding='utf-8', errors='ignore').read().split('\n')

# Dicionário para mapear cada linha com o seu id
# Olá - Olá
# Tudo bem? -Tudo!
# Eu também estou bem

id_linha = {}

for linha in linhas:
    #print(linha)
    _linha = linha.split(' +++$+++ ')
    if len(_linha) == 5:
        #print(_linha[4])
        id_linha[_linha[0]] = _linha[4]

conversa_id = []
for conversa in conversas[:-1]:
    #print(conversa)
    _conversa = conversa.split(' +++$+++ ')[-1][1:-1].replace("'","").replace(" ","")
    conversa_id.append(_conversa.split(','))
    
# Separação das perguntas e das respostas

# 194   - 195   - 196   - 197
# [...] - [...] - [...] - [...]


perguntas = []
respostas = []

for conversa in conversa_id:
    #print(conversa)
    #print('---------')
    for i in range(len(conversa) - 1):
        #print(i)
        perguntas.append(id_linha[conversa[i]])
        respostas.append(id_linha[conversa[i+1]])

# Limpando texto
    
def limpa_texto(texto):
    texto = texto.lower()
    texto = re.sub(r"i'm","i am", texto)
    texto = re.sub(r"he's","he is", texto)
    texto = re.sub(r"she's","she is", texto)
    texto = re.sub(r"that's","that is", texto)
    texto = re.sub(r"what's","what is", texto)
    texto = re.sub(r"where's","where is", texto)
    texto = re.sub(r"'ll","will", texto)
    texto = re.sub(r"'ve","have", texto)
    texto = re.sub(r"'re","are", texto)
    texto = re.sub(r"'d","would", texto)
    texto = re.sub(r"won't","will not", texto)
    texto = re.sub(r"can't","cannot", texto)
    texto = re.sub(r"[-()#/@;:<>{}~+=?.|,]", "", texto)
    texto = re.sub(r"didn't", "did not", texto)
    texto = re.sub(r"it's", "", texto)  
    texto = re.sub(r"don't", "do not", texto)  
    #c'esc
    return texto

print(limpa_texto("ExeMpLo i'm #@"))

perguntas_limpas = []

for pergunta in perguntas:
    perguntas_limpas.append(limpa_texto(pergunta))

respostas_limpas = []
for resposta in respostas:
    respostas_limpas.append(limpa_texto(resposta))

# Criação de um dicionário que mapeia cada palavra e o número de ocorrências NLTK
palavras_contagem = {}

for pergunta in perguntas_limpas:
    for palavra in re.sub(r"!", " !", pergunta).split():
        if palavra not in palavras_contagem:
            palavras_contagem[palavra]  = 1
        else:
            palavras_contagem[palavra] += 1
            
for resposta in respostas_limpas:
    for palavra in re.sub(r"!", " !", resposta).split():
        if palavra not in palavras_contagem:
            palavras_contagem[palavra]  = 1
        else:
            palavras_contagem[palavra] += 1
            
# Remoção das palavras não frequentes
limite = 20 # Recomenda - se iniciar os testes removendo as palavras 
            # que aparecem menos de 5% das vezes e depois ir diminuindo 
            # e verificando o ponto ótimo (para máquinas tradicionais o
            # valor inicial deve ser de 10 a 20%)
           
# Processo de tokenização

perguntas_palavras_tk = {}
nro_tk_palavra = 0
for palavra, contagem in palavras_contagem.items():
    if contagem >= limite:
        perguntas_palavras_tk[palavra] = nro_tk_palavra
        nro_tk_palavra += 1

respostas_palavras_tk = {}
nro_tk_palavra = 0
for palavra, contagem in palavras_contagem.items():
    if contagem >= limite:
        respostas_palavras_tk[palavra] = nro_tk_palavra
        nro_tk_palavra += 1        
    
# Adicao de tokens especiais

tokens = ['<PAD>', '<EOS>', '<OUT>', '<SOS>']
# PAD =>
# EOS => Simboliza o fim da sentença
# OUT => Simboliza palavras pouco usadas
# SOS => Simboliza o inicio  da sentença

for token in tokens:
    perguntas_palavras_tk[token] = len(perguntas_palavras_tk) + 1
for token in tokens:
    respostas_palavras_tk[token] = len(respostas_palavras_tk) + 1
    
# Inversão do dicionário com os tokens

    tk_perguntas_palavras = {p_i: p for p, p_i in respostas_palavras_tk.items()}
    
# Adição do token final de string <EOS> para o final de cada resposta

for i in range(len(respostas_limpas)):
    respostas_limpas[i] += ' <EOS>'
    
# Transpilação de todas as perguntas e respostas para inteiro
# E Substituição das palavras menos frequentes para <OUT>
perguntas_para_pk = []
for pergunta in perguntas_limpas:
    pks = []
    for palavra in pergunta.split():
        if palavra not in perguntas_palavras_tk:
            pks.append(perguntas_palavras_tk['<OUT>'])
        else:
            pks.append(perguntas_palavras_tk[palavra])
    perguntas_para_pk.append(pks)

respostas_para_pk = []
for resposta in respostas_limpas:
    pks = []
    for palavra in resposta.split():
        if palavra not in respostas_palavras_tk:
            pks.append(respostas_palavras_tk['<OUT>'])
        else:
            pks.append(respostas_palavras_tk[palavra])
    respostas_para_pk.append(pks)
            
# ordenação das perguntas e repostas pelo tamanho das perguntas      
perguntas_limpas_ordenadas = []
respostas_limpas_ordenadas = []

for tamanho in range(1, 25 + 1):
    for i in enumerate(perguntas_para_pk):
        if len(i[1]) == tamanho:
            perguntas_limpas_ordenadas.append(perguntas_para_pk[i[0]])
            respostas_limpas_ordenadas.append(respostas_para_pk[i[0]])
            

    