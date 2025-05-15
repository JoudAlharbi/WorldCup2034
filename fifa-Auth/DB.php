<?php
require "Config.php";

class DB
{
    public $connect;
    public $data;
    private $sql;
    protected $servername;
    protected $username;
    protected $password;
    protected $databasename;

    public function __construct()
    {
        $this->connect = null;
        $this->data = null;
        $this->sql = null;
        $dbc = new Config();
        $this->servername = $dbc->servername;
        $this->username = $dbc->username;
        $this->password = $dbc->password;
        $this->databasename = $dbc->databasename;
    }

    function dbConnect()
    {
        // Connect without database first
                $this->connect = mysqli_connect($this->servername, $this->username, $this->password);
                if (!$this->connect) {
                    die("Connection failed: " . mysqli_connect_error());
                }

                // Create DB if not exists
                $createDB = "CREATE DATABASE IF NOT EXISTS `$this->databasename`";
                if (!mysqli_query($this->connect, $createDB)) {
                    die("Database creation failed: " . mysqli_error($this->connect));
                }

                // Select DB
                mysqli_select_db($this->connect, $this->databasename);

                // Create table if it doesn't exist
                $createTable = "
                    CREATE TABLE IF NOT EXISTS user (
                        fullname VARCHAR(100) NOT NULL,
                        email VARCHAR(100) NOT NULL,
                        username VARCHAR(100) NOT NULL UNIQUE,
                        password VARCHAR(255) NOT NULL,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                ";

                if (!mysqli_query($this->connect, $createTable)) {
                    die("Table creation failed: " . mysqli_error($this->connect));
                }

                return $this->connect;
            }

    function prepareData($data)
    {
        return mysqli_real_escape_string($this->connect, stripslashes(htmlspecialchars($data)));
    }

    function logIn($table, $username, $password)
    {
        $username = $this->prepareData($username);
        $password = $this->prepareData($password);
        $this->sql = "select * from " . $table . " where username = '" . $username . "'";
        $result = mysqli_query($this->connect, $this->sql);
        $row = mysqli_fetch_assoc($result);
        if (mysqli_num_rows($result) != 0) {
            $dbusername = $row['username'];
            $dbpassword = $row['password'];
            if ($dbusername == $username && password_verify($password, $dbpassword)) {
                $login = true;
            } else $login = false;
        } else $login = false;

        return $login;
    }

    function signUp($table, $fullname, $email, $username, $password)
    {
        $fullname = $this->prepareData($fullname);
        $username = $this->prepareData($username);
        $password = $this->prepareData($password);
        $email = $this->prepareData($email);
        $password = password_hash($password, PASSWORD_DEFAULT);
        $this->sql =
            "INSERT INTO " . $table . " (fullname, username, password, email) VALUES ('" . $fullname . "','" . $username . "','" . $password . "','" . $email . "')";
        if (mysqli_query($this->connect, $this->sql)) {
            return true;
        } else return false;
    }

}

?>
