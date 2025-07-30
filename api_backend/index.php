<?php 

$teste = 'Servidor PHP funcionando!' ;

echo $teste, "\n" ;

var_dump($teste);

echo "\r";

$teste = true ;


if (is_bool($teste)) {
    echo "Agora é booleano: $teste", "\r";
};

echo get_debug_type($teste), "\n";
