<?php
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

// Buscar dados dos pacientes
$sql = "SELECT id, nome, email, telefone, procedimento, mensagem FROM pacientes";
$result = $conn->query($sql);

$patients = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $patients[] = $row;
    }
}

$conn->close();

echo json_encode($patients);
?>