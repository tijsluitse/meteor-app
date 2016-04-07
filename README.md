#Meteor Application
Real Time Web - Meteor JS Application

##Exercise 3
I want to create an application to determine the duration of sunshine on terraces of nice cafe's or restaurants in the heart of Amsterdam. The datasource I want to use for this project is SunCalc. It's an tiny BSD-licensed JavaScript library for calculating sun position, sunlight phases (times for sunrise, sunset, dusk, etc.), moon position and lunar phase for the given location and time.

Pros:
- The code works with long, lat
- All calculations are already done inside the library, with altitude and azimuth

Cons:
- It does not calculates the sunlight blocked by buildings around a certain position
- I do not know what kind of data the library produces

Source: [SunCalc](https://github.com/mourner/suncalc)

##Exercise 4
De applicatie die ik wil gaan maken is een simpele app waarbij je cafes die in de buurt zijn, een terras hebben wat in de zon ligt. De applicatie houdt rekening met de locatie waar jij je bevindt, welk terras er op dit moment in de zon zou liggen en op de zon ook daadwerkelijk op die locatie schijnt. De sortering van de cafes zal worden gedaan op locatie en op de duur van hoeveel zon er nog is op dat terras. 

Er is een hele lastige factor aan deze applicatie en die moet ik helaas weglaten bij de MVP. Dat is namelijk dat de hoogtes van gebouwen en/of bomen om het terras heen, invloed hebben op de hoeveelheid zon die er daadwerkelijk op het terras valt. Deze berekening kan ik op dit moment nog niet doen en zal in een later stadium van de applicatie geimplementeerd worden. 

De features van mijn MVP versie zijn: 
- het berekenen van jou jouw locatie, 
- cafes daar in de buurt zoeken met een terras, 
- per locatie van het terras de zonstand berekenen ten opzichte van hoelaat het nu is en hoelang daar de zon nog schijnt en het lokale weer weergeven (zon, sneeuw, bewolkt of regen) per terras.

De reactiveness:
- de lijst van terrassen zal continu aangepast worden op jouw locatie en de zonpositie + weersvoorspelling van die plek

De ideale versie van de applicatie heeft:
- per terras precies de momenten wanneer daar de zonschijnt
- een wifi verbinding met lichtmeters die via een ESP worden verstuurd naar de applicatie
- een berekening van de drukte per terras
- gemiddeldes voor wanneer een terras druk is en wanneer minder

Verschillende views:
- home met login functie
- overzicht met locaties in de buurt die op dit moment in de zon liggen
- zoek functie naar andere locaties
- informatie over de applicatie

