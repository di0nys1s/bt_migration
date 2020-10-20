const express = require( 'express' );
const app = express();
const cors = require( 'cors' );
const pool = require( './db' );

// middleware
app.use( cors() );
app.use( express.json() );

// Routes
// Get all cases
app.get( '/cases', async ( req, res ) => {
    try {
        const allCases = await pool.query( "SELECT * FROM cases" )
        res.json( allCases.rows )
    } catch (error) {
        console.error(error.message)
    }
} )

// Get all casenotes
app.get( '/casenotes', async ( req, res ) => {
    try {
        const allCaseNotes = await pool.query( "SELECT * FROM casenotes" )
        res.json( allCaseNotes.rows )
    } catch (error) {
        console.error(error.message)
    }
} )

// Get casenotes by caseid
app.get( '/casenotes/:case_number_dyn', async ( req, res ) => {
    try {
        caseNumber = req.params;

        console.log( caseNumber );

        const caseNotes =  await pool.query('SELECT * FROM casenotes WHERE case_number_dyn = $1', [caseNumber.case_number_dyn])
        
        console.log( 'caseNotes', caseNotes.rows )
        
        
        res.json( caseNotes.rows)

        
    } catch (error) {
        console.error(error.message)
    }
})


app.listen( 5000, () => {
    console.log( 'Server has started on port 5000' );
})