# GA_Project1 - Zombie Land

//Summary

* Hostiles spawn at central area
* Hostiles attract towards the user 
* Once enemies touch user, user dies
* User navigation via keypress or mouse
* User needs to navigate to get treasure
* speed modifier for hostiles increase based on timer.

Approach/Technologies used

1) DOM manipulation. (Buttons -onclick/mouseover/mouseleave)
2) Map (using canvas library)
3a) Person walking  (animations using canvas drawimg function)
3b) Enemies chasing (animations using canvas drawimg function)
-forEach zombie
4) Game loop 
-requestAnimationFrame(animationID) && cancelAnimationFrame(animationID)
-clearRect() :clear map	
-drawImage() :map
5) coinS.pop() //destroy coin
6) walls and collisions

Issues resolved
* How to have multiple objects tracking user at the same time
* Zombie speed varying as a function of distance between the player and zombie. Multiplier added to keep speed of zombie constant

5) Bonuses (future)

* consider using SVG?
* Some speed modifier for hostiles
* Keypress -> ability to move front only, change bearing via left and right key
* after certain no. of coins, ability to kill zombies
* Fog of war + tracking camera(zoom)
https://pothonprogramming.github.io/content/tile-scroll/tile-scroll.html
