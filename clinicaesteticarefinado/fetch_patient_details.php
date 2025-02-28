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

$patientId = $_GET['id'];

// Buscar detalhes do paciente
$sql = "SELECT nome, email, telefone, procedimento, mensagem FROM pacientes WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $patientId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $patient = $result->fetch_assoc();
    echo json_encode($patient);
} else {
    echo json_encode([]);
}

$stmt->close();
$conn->close();
?>