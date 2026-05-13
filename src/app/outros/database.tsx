import { SQLiteDatabase } from "expo-sqlite";

const database_name = "presencaAula.db";
export default function Database() {
  return null;
}
export async function CriandoBancoDados(db: SQLiteDatabase) {
  await db.execAsync(` 
            CREATE TABLE IF NOT EXISTS perfil (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            telefone TEXT
             );

            CREATE TABLE IF NOT EXISTS colegio (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            responsavel TEXT,
            email TEXT,
            telefone TEXT
             );

            CREATE TABLE IF NOT EXISTS disciplina (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            colegioId INTEGER
            );

            CREATE TABLE IF NOT EXISTS aluno (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            registroMatricula TEXT,
            idColegio INTEGER,
            idDisciplina INTEGER,
            ano TEXT,
            serie TEXT,
            turma TEXT
            );
            `);

  console.log("Criando Banco de dados");
}
export async function RecriandoBancoDados(db: SQLiteDatabase) {
  await db.execAsync(` 
            DROP TABLE IF EXISTS perfil;
            CREATE TABLE IF NOT EXISTS perfil (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            telefone TEXT
             );

            DROP TABLE IF EXISTS colegio;
            CREATE TABLE IF NOT EXISTS colegio (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            responsavel TEXT,
            email TEXT,
            telefone TEXT
             );

            DROP TABLE IF EXISTS disciplina;
            CREATE TABLE IF NOT EXISTS disciplina (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            colegioId INTEGER
            );

            DROP TABLE IF EXISTS aluno;
            CREATE TABLE IF NOT EXISTS aluno (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            registroMatricula TEXT,
            idColegio INTEGER,
            idDisciplina INTEGER,
            ano TEXT,
            serie TEXT,
            turma TEXT
            );
            `);

  console.log("Criando Banco de dados");
}
