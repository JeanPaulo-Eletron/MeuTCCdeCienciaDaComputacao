%%-----------------------------------------------------------------------------
%% The LaTeX Project Public License 
%%-----------------------------------------------------------------------------
%% This work may be distributed and/or modified under the
%% conditions of the LaTeX Project Public License, either version 1.3
%% of this license or (at your option) any later version.
%% The latest version of this license is in
%%   http://www.latex-project.org/lppl.txt
%% and version 1.3 or later is part of all distributions of LaTeX
%% version 2005/12/01 or later.
%%
%% Further information about abnTeX2 are available on http://www.abntex.net.br/
%%------------------------------------------------------------------------------


% -----------------------------------------------------------------------------
% Universidade Tecnológica Federal do Paraná - UTFPR
%
% Customização da classe abnTeX2 (http://www.abntex.net.br/) para as normas da UTFPR
%
% Projeto: http://tcc.tsi.gp.utfpr.edu.br/paginas/modelos-latex-da-utfpr
%
% Autores: Diego Marczal
% 	       Michael Vornes <https://github.com/mvornes>
%
%------------------------------------------------------------------------------
% Codificação: UTF-8
% LaTeX:  abnTeX2          
% -----------------------------------------------------------------------------

\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{configuracoes/utfpr-abntex2}[2016/07/07 v1.0]

% Repassa os parâmetros ao abntex2
\DeclareOption*{\PassOptionsToClass{\CurrentOption}{abntex2}}

\PassOptionsToClass{%
% Opções da classe memoir
    12pt,                     % Tamanho da fonte
    a4paper,                  % Tamanho do papel.
    sumario=tradicional,      % Seleciona o sumário tradicional
% Opções do pacote babel
    brazil,                   % Idioma do documento
}{abntex2}

\ProcessOptions\relax
\LoadClass{abntex2}

\RequirePackage[brazilian, hyperpageref]{backref}       % Produzir índice nas referências
\RequirePackage{makeidx}                                % Produzir índice remissivo de palavras
\RequirePackage{chngcntr}

% -----------------------------------------------------------------------------
% Configurações gerais
% -----------------------------------------------------------------------------

% Retira o espaço extra desnecessário nas frases
\frenchspacing

% Configurações do pacote backref usado sem a opção hyperpageref de backref
\renewcommand{\backrefpagesname}{Citado na(s) p\'agina(s):~}

% Texto padrão antes do número das páginas
\renewcommand{\backref}{}

% Define as listas de item compactas (sem espaçamento entre os itens)
\setlist{noitemsep, topsep=0pt, parsep=0pt, partopsep=0pt}

% Define os textos da citação
\renewcommand*{\backrefalt}[4]
{%
    \ifcase #1
        Nenhuma cita\c{c}\~ao no texto.
    \or
        Citado na p\'agina #2.
    \else
        Citado #1 vezes nas p\'aginas #2.
    \fi
}

% Define a numeração das equações de forma sequencial
\counterwithout{equation}{chapter}

% -----------------------------------------------------------------------------
% Comandos de dados
% -----------------------------------------------------------------------------

% Comandos de dados - Departamento
\providecommand{\imprimirdepartamento}{}
\newcommand{\departamento}[1]{\renewcommand{\imprimirdepartamento}{#1}}

% Comandos de dados - Programa
\providecommand{\imprimirprograma}{}
\newcommand{\programa}[1]{\renewcommand{\imprimirprograma}{#1}}

% Comandos de dados - Subtítulo do trabalho
\providecommand{\imprimirsubtitulo}{}
\newcommand{\subtitulo}[1]{\renewcommand{\imprimirsubtitulo}{#1}}

% Comandos de dados - Instituição do orientador
\providecommand{\imprimirinstOrientador}{}
\newcommand{\instOrientador}[1]{\renewcommand{\imprimirinstOrientador}{#1}}

% Comandos de dados - Instituição do coorientador
\providecommand{\imprimirinstCoorientador}{}
\newcommand{\instCoorientador}[1]{\renewcommand{\imprimirinstCoorientador}{#1}}

% Comandos de dados -  Tipo de trabalho acadêmico (trabalho de conclusão de curso, tese, dissertação ou projeto de qualificação)
\providecommand{\imprimirprojeto}{}
\newcommand{\projeto}[1]{\renewcommand{\imprimirprojeto}{#1}}

% Comandos de dados - Título Acadêmico a ser alcançado (Bacharel, Tecnólogo)
\providecommand{\imprimirtituloAcademico}{}
\newcommand{\tituloAcademico}[1]{\renewcommand{\imprimirtituloAcademico}{#1}}

% Comandos de dados - Título em Inglês
\providecommand{\imprimirautorcitacao}{}
\newcommand{\autorcitacao}[1]{\renewcommand{\imprimirautorcitacao}{#1}}

% Comandos de dados - Nome autor para citação
\providecommand{\imprimirtitleabstract}{}
\newcommand{\titleabstract}[1]{\renewcommand{\imprimirtitleabstract}{#1}}

% Comandos de dados - Área de concentração com Rótulo
\newcommand{\imprimirareaconcentracaoRotulo}{\'Area de concentra\c{c}\~ao: }
\providecommand{\imprimirareaconcentracao}{}
\newcommand{\areaconcentracao}[1]{\renewcommand{\imprimirareaconcentracao}{#1}}

% Comandos de dados - linha de pesquisa
\newcommand{\imprimirlinhapesquisaRotulo}{Linha de pesquisa: }
\providecommand{\imprimirlinhapesquisa}{}
\newcommand{\linhapesquisa}[1]{\renewcommand{\imprimirlinhapesquisa}{#1}}

% Comandos de dados - Texto da folha de aprovação
\providecommand{\imprimirtextopadraofolhadeaprovacao}{}
\newcommand{\textopadraofolhadeaprovacao}[1]{\renewcommand{\imprimirtextopadraofolhadeaprovacao}{#1}}

% Comandos de dados - Logomarca da instituição
\providecommand{\imprimirlogoinstituicao}{}
\newcommand{\logoinstituicao}[2]{\renewcommand{\imprimirlogoinstituicao}{\includegraphics[width={#1}\textwidth]{#2}}}

% -----------------------------------------------------------------------------
% Estilo de elementos
% -----------------------------------------------------------------------------

% Elementos pré-textuais
\renewcommand{\pretextual}
{%
    \pagenumbering{gobble}
    \aliaspagestyle{chapter}{empty}
    \pagestyle{empty}
    \aliaspagestyle{cleared}{empty}
    \aliaspagestyle{part}{empty}
}

% Configura layout para elementos textuais
\renewcommand{\textual}
{%
    \pagenumbering{arabic} % A numeração das páginas é em algarismos arábicos, inciando em 1
    \pagestyle{abntheadings}
    \aliaspagestyle{chapter}{abntchapfirst}
    \nouppercaseheads
    \bookmarksetup{startatroot}
}

% Configura layout para elementos pós-textuais
\renewcommand{\postextual}
{%
    \chapterstyle{abnt}
    \phantompart
}

% -----------------------------------------------------------------------------
% Objetos flutuantes
% -----------------------------------------------------------------------------

% Comando que trata a fonte nos objetos flutuantes
\renewcommand{\fonte}[1]
{%
    \begin{SingleSpacing}\par\end{SingleSpacing}
    \centering\small{Fonte: #1}
}

% Comando que trata as notas nos objetos flutuantes
\renewcommand{\nota}[1]
{%
    \begin{SingleSpacing}\par\end{SingleSpacing}
    \begin{tabular}{l p{.85\textwidth}}%
        Nota: & #1
    \end{tabular}
}

% -----------------------------------------------------------------------------
% Parágrafos
% -----------------------------------------------------------------------------

% Tamanho da indentação do parágrafo
\setlength{\parindent}{1.5cm}

% Espaçamento entre um parágrafo e outro
\setlength{\parskip}{0.0cm}

% -----------------------------------------------------------------------------
% Fontes
% -----------------------------------------------------------------------------

% Redefinição de fontes
\renewcommand{\ABNTEXchapterfont}{\normalfont\bfseries}
\renewcommand{\ABNTEXchapterfontsize}{\normalsize}

\renewcommand{\ABNTEXpartfont}{\normalfont}
\renewcommand{\ABNTEXpartfontsize}{\ABNTEXchapterfontsize}

\renewcommand{\ABNTEXsectionfont}{\normalfont}
\renewcommand{\ABNTEXsectionfontsize}{\normalsize}

\renewcommand{\ABNTEXsubsectionfont}{\normalfont}
\renewcommand{\ABNTEXsubsectionfontsize}{\normalsize}

\renewcommand{\ABNTEXsubsubsectionfont}{\normalfont}
\renewcommand{\ABNTEXsubsubsectionfontsize}{\normalsize}

\renewcommand{\ABNTEXsubsubsubsectionfont}{\normalfont}
\renewcommand{\ABNTEXsubsubsubsectionfontsize}{\normalsize}

% -----------------------------------------------------------------------------
% Sumário
% -----------------------------------------------------------------------------

% Travessão no sumário para apêndices e anexos
%\renewcommand{\cftchapteraftersnum}{\hfill\textendash\hfill}

% Insere espaço entre os itens do sumário de diferentes capítulos
\setlength{\cftbeforechapterskip}{1.0em \@plus\p@}

% -----------------------------------------------------------------------------
% Listas
% -----------------------------------------------------------------------------

% Define os títulos das listas
\addto\captionsbrazil{%
% Ajusta nomes padrões do babel
    \renewcommand{\listadesiglasname}{LISTA DE ABREVIATURAS E SIGLAS}
    \renewcommand{\listadesimbolosname}{LISTA DE S\'{I}MBOLOS}
    \renewcommand{\listfigurename}{LISTA DE FIGURAS}
    \renewcommand{\listtablename}{LISTA DE TABELAS}
    \renewcommand{\indexname}{\'{I}NDICE REMISSIVO}
% Ajusta nomes usados com a macro \autoref
    \renewcommand{\pageautorefname}{p\'agina}
    \renewcommand{\sectionautorefname}{Se\c{c}\~ao}
    \renewcommand{\subsectionautorefname}{Subse\c{c}\~ao}
    \renewcommand{\subsubsectionautorefname}{Subsubse\c{c}\~ao}
    \renewcommand{\paragraphautorefname}{Subse\c{c}\~ao}
}

% Cria a lista de quadros
\newcommand{\listofquadrosname}{Lista de Quadros}
\newcommand{\quadroname}{Quadro}
\newfloat[chapter]{quadro}{loq}{\quadroname}
\newlistof{listofquadros}{loq}{\listofquadrosname}
\newlistentry{quadro}{loq}{0}
\counterwithout{quadro}{chapter}
\renewcommand{\cftquadroname}{\quadroname\space}
\renewcommand*{\cftquadroaftersnum}{\hfill--\hfill}


% ***** Definição da Lista de Símbolos e siglas *****
% Baseado no codigo proposto no manual da classe abntex abntex-classe-doc.pdf
%
% \simb[entrada na lista de símbolos]{símbolo}:
% Escreve o simbolo no texto e uma entrada na Lista de Símbolos.
% Se o parâmetro opcional á omitido, usa-se o parâmetro obrigatório.
\newcommand{\simb}[2][]{%
	\settowidth{\simbwidth}{\ensuremath{#2}}\ignorespaces
	\ifthenelse{\lengthtest{\simbwidth > \simbmaxwidth}} % Se a nova sigla é maior,
		{\settowidth{\simbmaxwidth}{\ensuremath{#2}}} % seta o valor da maior com o tamanho da atual.
		{}\ignorespaces
	\ifthenelse{\equal{#1}{}}
		{\addcontentsline{los}{simbolo}{\protect\parbox[t]{\protect\simbmaxwidth}{\ensuremath{#2}}}}
		{\addcontentsline{los}{simbolo}{\protect\parbox[t]{\protect\simbmaxwidth}{\ensuremath{#2}} \protect\parbox[t]{\protect\textwidth - \protect\simbmaxwidth}{#1}}}\ignorespaces
	\ensuremath{#2}}
	
% \listadesimbolos: comando que imprime a lista de simbolos
\newcommand{\listadesimbolos}{
	\pretextualchapter{\listadesimbolosname}
	{\setlength{\parindent}{0cm}
	 % Abrindo arquivo para leitura e verificando se ele existe:
		 \newread\instream
		 \immediate\openin\instream= \jobname.tmp
		 \ifeof\instream 
		 	\message{\jobname.tmp nao existe ainda. Rode o latex novamente.} % Na primeira vez.
       \else 
       	\immediate\read\instream to \auxcommand % O comando no arquivo temporario é salvo em \auxcommand.
       	\immediate\closein\instream % Fechando o arquivo.
       	\auxcommand % Executando o comando lido.
       \fi
	
	 \addtolength{\simbmaxwidth}{2.5 cm}  % Distancia de acordo com a norma da ABNT
	 \@starttoc{los}}}

% como a entrada será impressa
\newcommand\l@simbolo[2]{
	\parbox[b]{\textwidth}{#1}
}

\newlength{\siglawidth}
\newlength{\siglamaxwidth}
\newlength{\simbwidth}
\newlength{\simbmaxwidth}

% \sigla[entrada na lista de siglas]{sigla}:
% Escreve a sigla no texto e uma entrada na Lista de Siglas.
% Se o parâmetro opcional á omitido, usa-se o parâmetro obrigatório.
\newcommand{\sigla}{\@ifstar{\siglaStar}{\siglaNotStar}}	
\newcommand{\siglaNotStar}[2][]{%
	\settowidth{\siglawidth}{#2}\ignorespaces
	\ifthenelse{\lengthtest{\siglawidth > \siglamaxwidth}}% Se a nova sigla é maior,
		{\settowidth{\siglamaxwidth}{#2}}% seta o valor da maior com o tamanho da atual.
		{}\ignorespaces
\nomenclature{#2}{#1}%
({#2})}

\newcommand{\siglaStar}[2][]{%
	\settowidth{\siglawidth}{#2}\ignorespaces
	\ifthenelse{\lengthtest{\siglawidth > \siglamaxwidth}}% Se a nova sigla é maior,
		{\settowidth{\siglamaxwidth}{#2}}% seta o valor da maior com o tamanho da atual.
		{}\ignorespaces
\nomenclature{#2}{#1}%
{#2}}

\newcommand{\fazlistasiglas}[1][Lista de Siglas]{% Este comando redefine o codigo relevante do nomencl.sty
\def\thenomenclature{%
   \if@openright\cleardoublepage\else\clearpage\fi%
   \pretextualchapter{\nomname}
    \if@intoc\addcontentsline{toc}{chapter}{\nomname}\fi%
  \nompreamble
  \list{}{%
    \labelwidth\nom@tempdim
    \leftmargin\labelwidth
    \advance\leftmargin\labelsep
    \itemsep\nomitemsep
    \let\makelabel\nomlabel}}
\def\endthenomenclature{%
  \endlist
  \nompostamble}%
\makenomenclature%
\renewcommand{\nomname}{#1}
%\renewcommand{\nomentryend}{}%
%\renewcommand{\nomentryend}{.}%
\setlength{\nomitemsep}{-\parsep}% Tirando espaço extre entre as entradas na lista.
}

% \listadesiglas: comando que imprime a lista de siglas
\newcommand{\listadesiglas}{
		 % Abrindo arquivo para leitura e verificando se ele existe:
		 \newread\instream
		 \immediate\openin\instream=\jobname.tmp
		 \ifeof\instream 
		 	\message{\jobname.tmp nao existe ainda. Rode o latex novamente.} % Na primeira vez.
       \else 
         \immediate\read\instream to \auxcommand % O primeiro comando é o da lista de simbolos.
       	\immediate\read\instream to \auxcommand % O comando no arquivo temporario é salvo em \auxcommand.
       	\immediate\closein\instream % Fechando o arquivo.
       	\auxcommand % Executando o comando lido.
       \fi
		 \addtolength{\siglamaxwidth}{2.5 cm}
\printnomenclature[\the\siglamaxwidth]}

% -----------------------------------------------------------------------------
% Capa
% -----------------------------------------------------------------------------
\makeatletter
\renewcommand{\imprimircapa}{
    \begin{capa}
        \begin{center}
		\begin{SingleSpacing}
            		\large\MakeUppercase{\imprimirinstituicao} \\
	    		\abntex@ifnotempty{\imprimirdepartamento}
            		{
                		\MakeUppercase{\imprimirdepartamento} \\
            		}
           		\large\MakeUppercase{\imprimirprograma} \\
		\end{SingleSpacing}
        \end{center}
        \vspace{60pt}
	\begin{center}
		\large\MakeUppercase{\imprimirautor}\\
	\end{center}
	\vspace{120pt}
        \begin{center}
            \ABNTEXchapterfont\large\MakeUppercase{\imprimirtitulo}
            \abntex@ifnotempty{\imprimirsubtitulo}
	    {%
                {\ABNTEXchapterfont: }{\large{\imprimirsubtitulo}}
            }
        \end{center}
	\vspace{120pt}
	\begin{center}
		\large\MakeUppercase{\imprimirprojeto}
	\end{center}
	\vfill
        \begin{center}
		\begin{SingleSpacing}
            		\large\MakeUppercase{\imprimirlocal}\\
            		\large\MakeUppercase{\imprimirdata}
		\end{SingleSpacing}
    	\end{center}

    \end{capa}

}
\makeatother

% -----------------------------------------------------------------------------
% Folha de rosto
% -----------------------------------------------------------------------------
\makeatletter
\renewcommand{\folhaderostocontent}
{%
    \setcounter{page}{2}
    \begin{center}
        \large\MakeUppercase{\imprimirautor}\\
    \end{center}

    \vspace*{96pt}

    \begin{center}
        \ABNTEXchapterfont\large\MakeUppercase{\imprimirtitulo}
        \abntex@ifnotempty{\imprimirsubtitulo}
	{%
        	{\ABNTEXchapterfont: }{\large{\imprimirsubtitulo}}
        }
    \end{center}

    \vspace*{60pt}

    \abntex@ifnotempty{\imprimirpreambulo}
    {%
        \SingleSpacing
        \begin{tabular}{p{.25\textwidth}p{.13\textwidth}p{.44\textwidth}}
            & \multicolumn{2}{p{.6\textwidth}}{\small\hyphenpenalty=10000{\imprimirpreambulo}} \\ & & \\
            \abntex@ifnotempty{\imprimirareaconcentracao}
            {%
                & \multicolumn{2}{p{.6\textwidth}}{\small\hyphenpenalty=10000{\imprimirareaconcentracaoRotulo\imprimirareaconcentracao}} \\ & & \\
            }
            \abntex@ifnotempty{\imprimirlinhapesquisa}
            {%
                & \multicolumn{2}{p{.6\textwidth}}{\small\hyphenpenalty=10000{\imprimirlinhapesquisaRotulo\imprimirlinhapesquisa}} \\ & & \\
            }
            \abntex@ifnotempty{\imprimirorientador}
            {%
                & \small\imprimirorientadorRotulo & \imprimirorientador \\
                & & \small\imprimirinstOrientador \\ & & \\
            }
            \abntex@ifnotempty{\imprimircoorientador}
            {%
                & \small\imprimircoorientadorRotulo & \imprimircoorientador \\
                & & \small\imprimirinstCoorientador
            }
        \end{tabular}
    }

    \vspace*{\fill}

    \begin{center}
	\begin{SingleSpacing}
            \large\MakeUppercase{\imprimirlocal}\\
            \large\MakeUppercase{\imprimirdata}
	\end{SingleSpacing}
    \end{center}
}
\makeatother

% -----------------------------------------------------------------------------
% Folha de aprovação
% -----------------------------------------------------------------------------
\makeatletter
\newcommand{\imprimirfolhadeaprovacao}
{%
    \begin{folhadeaprovacao}
        \vspace*{\fill}

        \begin{tabular}{p{.45\textwidth}p{.45\textwidth}}
            & \imprimirtextopadraofolhadeaprovacao \\
        \end{tabular}

        \vspace*{\fill}
    \end{folhadeaprovacao}
}
\makeatother

% -----------------------------------------------------------------------------
% Dedicatória
% -----------------------------------------------------------------------------
\renewenvironment{dedicatoria}[1][]
{%
    \ifthenelse{\equal{#1}{}}{%
        \PRIVATEbookmarkthis{\dedicatorianame}
    }{\pretextualchapter{#1}}

    \vspace*{\fill}

    \begin{flushright}
        \begin{minipage}{.5\textwidth}
            \begin{SingleSpacing}
                \setlength\parindent{0pt}
                \setlength\parskip{12pt}
}
{%
            \end{SingleSpacing}
        \end{minipage}
    \end{flushright}
}

% -----------------------------------------------------------------------------
% Epígrafe
% -----------------------------------------------------------------------------
\renewenvironment{epigrafe}[1][]
{%
    \ifthenelse{\equal{#1}{}}
    {%
        \PRIVATEbookmarkthis{\epigraphname}
    }{\pretextualchapter{#1}}

    \vspace*{\fill}

    \begin{flushright}
        \begin{minipage}{.5\textwidth}
            \begin{SingleSpacing}
                \setlength\parindent{0pt}
                \setlength\parskip{12pt}
}
{%
            \end{SingleSpacing}
        \end{minipage}
    \end{flushright}
}

