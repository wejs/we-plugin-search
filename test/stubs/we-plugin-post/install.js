module.exports = {
  /**
   * Install function run in we.js install.
   *
   * @param  {Object}   we    we.js object
   * @param  {Function} done  callback
   */
  install: function install(we, done) {
    var posts = [
    {
      title: 'Fallout (series)',
      /* jshint ignore:start */
      body: `Fallout is a series of post-apocalyptic role-playing video games. It was created by Interplay Entertainment. Although the series is set during the 22nd and 23rd centuries, its atompunk retrofuturistic setting and artwork are influenced by the post-war culture of 1950s America, and its combination of hope for the promises of technology, and lurking fear of nuclear annihilation. A forerunner for Fallout is Wasteland, a 1988 video game of which the Fallout series is regarded to be a spiritual successor. Although the game worlds are different, the background story, inhabitants, locations, and characters draw many parallels.

The first two titles in the series, Fallout and Fallout 2, were developed by Black Isle Studios. Micro Forté and 14 Degrees East's 2001 Fallout Tactics: Brotherhood of Steel is a tactical role-playing game. In 2004, Interplay closed Black Isle Studios,[1] and continued to produce an action game with role-playing elements for the PlayStation 2 and Xbox, Fallout: Brotherhood of Steel without Black Isle Studios. A third entry in the main series, Fallout 3, was released in 2008 by Bethesda Softworks. It was followed by Fallout: New Vegas in 2010, developed by Obsidian Entertainment. Fallout 4 was announced on June 3, 2015, and was released on November 10, 2015.

Bethesda Softworks owns the rights to produce Fallout games.[2] Soon after acquiring the rights to the intellectual property (IP), Bethesda licensed the rights to make a massively multiplayer online role-playing game (MMORPG) version of Fallout to Interplay. The MMORPG got as far as beta stage under Interplay,[3] but a lengthy legal dispute between Bethesda Softworks and Interplay, with Bethesda claiming Interplay had not met the terms and conditions of the licensing contract ceased development. The case was decided in favor of Bethesda.[4]`,
      /* jshint ignore:end */
      category: 'main',
      published: true
    },
    {
      title: 'Fallout (1997)',
      /* jshint ignore:start */
      body: `Released in 1997, Fallout takes place in a post-apocalyptic Southern California, beginning in the year 2161. The protagonist, named the Vault Dweller, is tasked with recovering a water chip in the Wasteland to replace the broken one in their underground shelter home, Vault 13. Afterwards, the Vault Dweller must thwart the plans of a group of mutants, led by a grotesque entity named the Master. Fallout was originally intended to run under the GURPS role-playing game system. However, a disagreement with the creator of GURPS, Steve Jackson, over the game's violent content required Black Isle Studios to develop the new SPECIAL system.[5] Fallout's atmosphere and artwork are reminiscent of post-WWII America and the nuclear paranoia that was widespread at that time.`,
      /* jshint ignore:end */
      category: 'session',
      published: true
    },
    {
      title: 'Fallout 2 (1998)',
      /* jshint ignore:start */
      body: `Fallout 2 was released in 1998, with several improvements over the first game, including an improved game engine, the ability to set attitudes of non-player character (NPC) party members and the ability to push people who are blocking doors. Additional features included several changes to the game world, including significantly more pop culture jokes and parodies, such as multiple Monty Python-referencing special random encounters, and self-parodying dialogue that broke the fourth wall to mention game mechanics. Fallout 2 takes place eighty years after Fallout, and centers around a descendant of the Vault Dweller, the protagonist of Fallout. The player assumes the role of the Chosen One as they try to save their village, Arroyo, from severe famine and droughts. After saving the village, the Chosen One must save it again, this time from the Enclave, the remnants of the pre-war United States Government.`,
      /* jshint ignore:end */
      category: 'session',
      comments: 18,
      published: true
    },
    {
      title: 'Fallout 3 (2008)',
      /* jshint ignore:start */
      body: `Fallout 3 was developed by Bethesda Game Studios and released on October 28, 2008. The story picks up thirty years after the setting of Fallout 2 and 200 years after the nuclear war that devastated the game's world.[6] The player-character is a Vault-dweller in Vault 101 who is forced to flee when the Overseer tries to arrest them in response to their father leaving the Vault. Once free, the player is dubbed the Lone Wanderer and ventures into the Wasteland in and around Washington, D.C., known as the Capital Wasteland, to find their father. It differs from previous games in the series by utilizing 3D graphics, a free-roam gaming world, and real-time combat, in contrast to previous games' 2D isometric graphics and turn-based combat. It was developed simultaneously for the PC, Xbox 360 and PlayStation 3 using the Gamebryo engine. It received highly positive reviews, garnering 94/100,[7] 92/100,[8] and 93/100[9] averages scores on Metacritic for the PC, PS3 and Xbox 360 versions of the game, respectively. It won IGN's 2008 Overall Game of the Year Award, Xbox 360 Game of the Year, Best RPG, and Best Use of Sound, as well as E3's Best of the Show and Best Role Playing Game.`,
      /* jshint ignore:end */
      category: 'session',
      comments: 5,
      published: true
    },
    {
      title: 'Fallout: New Vegas (2010)',
      /* jshint ignore:start */
      body: `Fallout: New Vegas was developed by Obsidian Entertainment and released on October 19, 2010.[10] The development team included developers who previously worked on Fallout and Fallout 2.[11][12] Fallout: New Vegas is not a direct sequel to Fallout 3;[13][14] rather, it is a stand-alone product.[13] Events in the game follow four years after Fallout 3 and offer a similar role-playing experience, but no characters from that game appear.[14] The player assumes the role of a courier in the post-apocalyptic world of the Mojave Wasteland. As the game begins, the Courier is shot in the head and left for dead shortly before being found and brought to a doctor in the nearby town of Goodsprings, marking the start of the game and the Courier's search for their would-be murderer. The city of New Vegas is a post-apocalyptic interpretation of Las Vegas. something.`,
      /* jshint ignore:end */
      comments: 10,
      published: false
    },
    {
      title: 'Fallout 4 (2015)',
      /* jshint ignore:start */
      body: `Fallout 4, developed by Bethesda Game Studios, was released on November 10, 2015. On June 3, 2015 the game's official website went live revealing the game along with its box art, platforms, and the first trailer.[15] The game was released for Microsoft Windows, PlayStation 4 and Xbox One and takes place in Boston, Massachusetts, of the in-game New England Commonwealth and features voiced protagonists.[16][17][18][19] The Xbox One version has been confirmed to have mods as of 2016. Bethesda has confirmed that the PlayStation 4 version has been denied proper access to mods by Sony but will post updates if any changes occur. .[20]

Fallout 4 takes place in the year 2287, ten years after the events of Fallout 3. Fallout 4 's story begins on the day the bombs dropped: October 23, 2077. The player's character (voiced by either Brian T. Delaney or Courtenay Taylor), dubbed as the Sole Survivor, takes shelter in Vault 111, emerging exactly 210 years later, after being subjected to suspended animation. something.`,
      /* jshint ignore:end */
      comments: 10,
      published: false
    }
    ];

    we.db.models.post.bulkCreate(posts)
    .spread(function() {
      we.log.info(posts.length + 'posts created');
      done();
    })
    .catch(done);
  }
};

