some observations: 
1. i dont see subtitle and body etc in the global elemetns. I typiecally like to start with pretitle, title, subtitle, description, body, quote,  as a starting place. but yes i also dont want to add more thatn we actually need for this simple project either but i do like thos as a base. 
2. on button hover i dont see the css variable defined.  
3. Color Swatch i think this is somethign we woudl define like this .card, then .color and then in the color scope we can define all the color section specifics and then all you have to do is apply .card and .color to the main data-scope="card" element and it will inherit all the color variables. for example if the card has a header body and footor (whih we should probabl yadd to every card by default) and the card uses a grid with three rows (which i like better than flex for the placement thing wiht css grid) then you can add a box to the header and then the header woudl get hydrated with the color variable defined in teh helper scope color.  we coudl apply that same color scope to a hero or a footor etc.. and if we have somethign defined it woudl override it.  theoritally this is how this wroks and this is the perfect opportunity to test and work out kinks etc. 

4. oh you created sepearate dasta scopes for the dashboard layout??? why? 
it should be this right?
/* Dashboard Scope - Desktop Layout */
        [data-scope="dashboard"] {
            --box-min-height: 100vh;
            --box-background: hsl(0, 0%, 98%);
        
            --layout-display: grid;
            --layout-columns: 300px 1fr;
            --layout-rows: 60px 1fr;
            --layout-areas: 
                "header header"
                "sidebar main";
            --layout-gap: 0;
        }

5. and heeader scope should be this 
/* Header Scope */
        [data-scope="header"] {
            --box-background: var(--color3);
            --box-padding: 0 2rem;
            --box-border-width: 0 0 1px 0;
            --box-border-color: hsl(0, 0%, 20%);
            grid-area: header;
        
            --layout-display: grid;
            --layout-columns: auto 1fr auto;
            --layout-align-items: center;
            --layout-gap: 2rem;
            height: 100%;
        
            --title-color: var(--color4);
            --title-size: 1.25rem;
        }

6. and sidebar scope should be this 
/* Sidebar Scope */
        [data-scope="sidebar"] {
            --box-background: hsl(0, 0%, 95%);
            --box-padding: 2rem;
            --box-border-width: 0 1px 0 0;
            --box-border-color: hsl(0, 0%, 85%);
            --box-overflow: auto;
            grid-area: sidebar;

            --layout-display: grid;
            --layout-rows: auto;
            --layout-gap: 2rem;
        }

well you get the picture i wont do the rest of them.... well actuall i am justion going to update them myself now. 

7. i am on teh card grid.  So firs off color-grid is not generic and highly reusable right?  so what would we do with this?  Well i would change the main content scope to .preview and then apply the layout to it... oh i just started to move it and realize that you have already added a grid layout to the main, so what i am goin gto do is delete teh color-grid scope since i dont think we need a speficic grid for colors but if we did we can define it in the .color  helper scope right? 

8 so i did move the color swatch to a data-helper .color scope and renamed the items to be color-swatch etc.. for more clarity.  we can now just apply the .color helper scope to the html to see the color apply (fingers crossed)
 
In the html i re arranged the datascopes to be theri own line above not inside of any of our defined item.

in the sidebar navigation, i think we want to define that as a sidebar-header scope and then put the tabs inside of that scope. i didnt try to fix this too complex. 

as a whole we need to discuss how to handle buttons. we need to work on our nexted scopes i see lots of opportuniteis for those here. 

I did update the main to preview in the scope and in the html. 

and i just stopped editing there it is all messed up but it wasnt displaying correctly to start LOL but it looked better than it does now. .But i think you will see what i am doing and you can fix it update it to match the system we are building. and then oncewwe have it built how i think it shoule be we can troubleshoot.  