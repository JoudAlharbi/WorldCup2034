<?php
class Config
{
    public $servername;
    public $username;
    public $password;
    public $databasename;

    public function __construct()
    {

        $this->servername = 'localhost';
        $this->username = 'root';
        $this->password = 'mysql';
        $this->databasename = 'fifa_users'; // make sure you created this database

    }
}

?>