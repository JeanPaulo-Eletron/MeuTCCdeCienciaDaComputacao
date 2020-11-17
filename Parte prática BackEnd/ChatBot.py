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

#print(limpa_texto("ExeMpLo i'm #@"))

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
            
# -------------------------SEQ2SEQ------------------------------------

# Criação de placeholders para as entradas e saídas
                 # !---- O preenchimento do PAD é para ele ficar com um tamanho constante de nro de letras  ----!
                 # Olá tudo bem <PAD> <PAD> <PAD> 
                 # Tudo sim e você 

def entradas_modelo():
    entradas  = tf.placeholder(tf.int32  , [None, None], name = 'entradas')
    saidas    = tf.placeholder(tf.int32  , [None, None], name = 'saidas')
    lr        = tf.placeholder(tf.float32, name = 'learning_rate')
    # Serve para zerar uma porcentagem dos neurónios
    keep_prob = tf.placeholder(tf.float32, name = 'keep_prob')
    return entradas, saidas, lr, keep_prob            

# Pré-Processamento das saídas (alvos)
# [batch_size, 1] = [64, 1]
def preprocessamento_saidas(saidas, palavras_para_tk, batch_size):
   esquerda = tf.fill([batch_size, 1], palavras_para_tk['<SOS>'])
   direita  = tf.strided_slice(saidas, [0,0], [batch_size, -1], strides = [1,1])
   saidas_preprocessadas = tf.concat([esquerda,direita], 1) 
   return saidas_preprocessadas

# Criação da camada da Rede Neural Recorrente do codificador
def rnn_codificador(rnn_entradas, rnn_tamanho, numero_camadas, keep_prob, tamanho_sequencia):
    lstm              = tf.contrib.rnn.LSTMCell(rnn_tamanho)
    lstm_dropout      = tf.contrib.rnn.DropoutWrapper(lstm, input_keep_prob = keep_prob)
    encoder_celula    = tf.contrib.rnn.MultiRNNCell([lstm_dropout] * numero_camadas)
    _, encoder_estado = tf.nn.bidirectional_dynamic_rnn(cell_fw = encoder_celula, 
                                                     cell_bw = encoder_celula,
                                                     sequence_length=tamanho_sequencia,
                                                     inputs = rnn_entradas,
                                                     dtype  = tf.float32)
    return encoder_estado

# Decodificação da base de dados de treinamento

def decodifica_base_treinamento(encoder_estado, 
                                decodificador_celula, 
                                decodificador_embedded_entrada, 
                                tamanho_sequencia,
                                decodificador_escopo, 
                                funcao_saida,
                                keep_prob, 
                                batch_size):
    estados_atencao = tf.zeros([batch_size, 1, decodificador_celula.output_size])
    attention_keys, attention_values, attention_score_function, attention_construct_function = tf.contrib.seq2seq.prepare_attention(estados_atencao, 
                                                                                                                                    attention_option = 'bahdanau',
                                                                                                                                    num_units = decodificador_celula.output_size)
    funcao_decodificador_treinamento = tf.contrib.seq2seq.attention_decoder_fn_train(encoder_estado[0],
                                                                                     attention_keys, attention_values, 
                                                                                     attention_score_function, attention_construct_function,
                                                                                     name = 'attn_dec_train')
    decodificador_saida, _, _ = tf.contrib.seq2seq.dynamic_rnn_decoder(decodificador_celula, 
                                                                       funcao_decodificador_treinamento,
                                                                       decodificador_embedded_entrada,
                                                                       tamanho_sequencia,
                                                                       scope = decodificador_escopo)
    decodificador_saida_dropout = tf.nn.dropout(decodificador_saida, keep_prob)
    
    return funcao_saida(decodificador_saida_dropout)

# Decodificação da base de dados de Testes/Validação

def decodifica_base_teste(encoder_estado, 
                          decodificador_celula, 
                          decodificador_embedding_matrix, sos_id, eos_id, tamanho_maximo,
                          numero_palavras, decodificador_escopo, funcao_saida, 
                          keep_prob, batch_size):
    estados_atencao = tf.zeros([batch_size, 1, decodificador_celula.output_size])
    attention_keys, attention_values, attention_score_function, attention_construct_function = tf.contrib.seq2seq.prepare_attention(estados_atencao, 
                                                                                                                                    attention_option = 'bahdanau',
                                                                                                                                    num_units = decodificador_celula.output_size)
    funcao_decodificador_teste = tf.contrib.seq2seq.attention_decoder_fn_inference(funcao_saida,
                                                                                   encoder_estado[0],
                                                                                   attention_keys, 
                                                                                   attention_values, 
                                                                                   attention_score_function, 
                                                                                   attention_construct_function,
                                                                                   decodificador_embedding_matrix, 
                                                                                   sos_id, 
                                                                                   eos_id,
                                                                                   tamanho_maximo,
                                                                                   numero_palavras,
                                                                                   name = 'attn_dec_inf')
    previsoes_teste, _, _ = tf.contrib.seq2seq.dynamic_rnn_decoder(decodificador_celula, 
                                                                   funcao_decodificador_teste,
                                                                   scope = decodificador_escopo)
    
    return previsoes_teste

# Criação da rede neural do decodificador

def rnn_decodificador(decodificador_embedded_entrada, decodificador_embeddings_matrix,
                      codificador_estado, numero_palavras, tamanho_sequencia, rnn_tamanho,
                      numero_camadas, palavras_para_tk, keep_prob, batch_size):
    with tf.variable_scope("decodificador") as decodificador_escopo:
        lstm                 = tf.contrib.rnn.LSTMCell(rnn_tamanho)
        lstm_dropout         = tf.contrib.rnn.DropoutWrapper(lstm, input_keep_prob = keep_prob)
        decodificador_celula = tf.contrib.rnn.MultiRNNCell([lstm_dropout] * numero_camadas)
        pesos                = tf.truncated_normal_initializer(stddev = 0.1) # Desvio padrão 0,1
        biases               = tf.zeros_initializer()
        funcao_saida         = lambda x: tf.contrib.layers.fully_connected(x, numero_palavras,
                                                                     None, 
                                                                     scope = decodificador_escopo,
                                                                     weights_initializer= pesos,
                                                                     biases_initializer = biases)

    previsoes_treinamento = decodifica_base_treinamento(codificador_estado,
                                                        decodificador_celula,
                                                        decodificador_embedded_entrada,
                                                        tamanho_sequencia,
                                                        decodificador_escopo,
                                                        funcao_saida,
                                                        keep_prob,
                                                        batch_size)
    decodificador_escopo.reuse_variables()
    previsoes_teste = decodifica_base_teste(codificador_estado,
                                            decodificador_celula,
                                            decodificador_embeddings_matrix,
                                            palavras_para_tk['<SOS>'],
                                            palavras_para_tk['<EOS>'],
                                            tamanho_sequencia - 1,
                                            numero_palavras,
                                            decodificador_escopo,
                                            funcao_saida,
                                            keep_prob,
                                            batch_size)
    return previsoes_treinamento, previsoes_teste

# Criação do modelo Seq2Seq
def modelo_seq2seq(entradas, saidas, keep_prob, batch_size, tamanho_sequencia,
                   numero_palavras_respostas, numero_palavras_perguntas,
                   tamanho_codificador_embeddings, tamanho_decodificador_embeddings,
                   rnn_tamanho, numero_camadas, perguntas_palavras_tk):
    codificador_embedded_entrada = tf.contrib.layers.embed_sequence(entradas,
                                                                    numero_palavras_respostas + 1,
                                                                    tamanho_codificador_embeddings,
                                                                    initializer = tf.random_uniform_initializer(0,1)
                                                                    )
    
    codificador_estado = rnn_codificador(codificador_embedded_entrada,
                                         rnn_tamanho, numero_camadas,
                                         keep_prob, tamanho_sequencia)
    saidas_preprocessadas = preprocessamento_saidas(saidas, perguntas_palavras_tk, batch_size)
    
    decodificador_embeddings_matrix = tf.Variable(tf.random_uniform([numero_palavras_perguntas + 1,
                                                                    tamanho_codificador_embeddings],0,1)
                                                  )
    decodificador_embeddings_entradas = tf.nn.embedding_lookup(decodificador_embeddings_matrix,
                                                               saidas_preprocessadas)
    
    previsoes_treinamento, previsoes_teste = rnn_decodificador(decodificador_embeddings_entradas,
                                                               decodificador_embeddings_matrix,
                                                               codificador_estado,
                                                               numero_palavras_perguntas,
                                                               tamanho_sequencia,
                                                               rnn_tamanho,
                                                               numero_camadas,
                                                               perguntas_palavras_tk,
                                                               keep_prob,
                                                               batch_size)
    return previsoes_treinamento, previsoes_teste

    
# $!$ Fazer um tratamento para ele não ignorar o "!" independente do nro de aparições