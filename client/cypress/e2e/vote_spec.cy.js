describe('Joke Voting App', () => {
    it('should load a joke and allow voting', () => {
      cy.visit('http://localhost:5173');
      
      // Check if the joke question is visible
      cy.get('div').contains('Why').should('exist');
      
      // Click on an emoji button (assuming the button text includes the emoji)
      cy.get('button').contains('😂').click();
      
      // Check if the vote count increased (the exact check might depend on your UI)
      cy.get('button').contains('😂').should('contain', '1');
      
      // Click "Next Joke" to load a new joke
      cy.contains('Next Joke').click();
    });
  });
  