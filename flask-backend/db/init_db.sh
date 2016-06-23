#! /bin/bash
db_file=$1
schema=$2
sqlite3 $db_file < $schema
