<?php
// Configurações do banco de dados
$servername = "cern_teste.mysql.dbaas.com.br";
$username = "cern_teste"; // Substitua pelo seu usuário do MySQL
$password = "Asd123@@"; // Substitua pela sua senha do MySQL
$dbname = "cern_teste"; // Substitua pelo nome do seu banco de dados

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Coletar dados do formulário
$nome = $_POST['nome'];
$email = $_POST['email'];
$telefone = $_POST['telefone'];
$procedimento = $_POST['procedimento'];
$mensagem = $_POST['mensagem'];

// Inserir dados no banco de dados
$sql = "INSERT INTO pacientes (nome, email, telefone, procedimento, mensagem)
VALUES ('$nome', '$email', '$telefone', '$procedimento', '$mensagem')";

if ($conn->query($sql) === TRUE) {
    // Redirecionar de volta para a página HTML com uma mensagem de sucesso
    header("Location: index.html?success=true");
    exit();
} else {
    echo "Erro: " . $sql . "<br>" . $conn->error;
}
/*echo "Paciente cadastrado com sucesso!";
} else {
    echo "Erro: " . $sql . "<br>" . $conn->error;
}*/

// Fechar conexão
$conn->close();
?>