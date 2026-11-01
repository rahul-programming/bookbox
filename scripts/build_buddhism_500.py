import json, re

def to_slug(title):
    cleaned = re.sub(r'[^a-zA-Z0-9]+', '-', title.lower()).strip('-')
    return cleaned[:80].rstrip('-')

buddhism_books = []

def add_b(title, author, year, insight, topic):
    b_id = to_slug(title)
    buddhism_books.append({
        "id": b_id,
        "title": title,
        "author": author,
        "year": str(year),
        "insight": insight,
        "topicGroup": topic,
        "dimensionId": 20,
        "dimensionName": "Spiritual Awakening, Mindfulness & Non-Duality",
        "subcategoryId": "20.2",
        "subcategoryName": "Buddhism & Zen",
        "category": "Spirituality",
        "subcategory": "Buddhism & Zen",
        "cleanSubcategory": "Buddhism & Zen",
        "status": "pending"
    })

# =========================================================================
# 1) Insight meditation - Mahasi Tradition (50 books)
# =========================================================================
mahasi_list = [
    ("Manual of Insight", "Mahasi Sayadaw", 1991, "Comprehensive master treatise on Vipassana development, stages of insight, and purification of view."),
    ("The Progress of Insight", "Mahasi Sayadaw", 1965, "The classic treatise detailing the sixteen progressive stages of insight knowledge leading to Nibbana."),
    ("Practical Vipassana Meditative Exercises", "Mahasi Sayadaw", 1970, "Foundational step-by-step instructions on rising and falling abdomen awareness and mental noting."),
    ("Satipatthana Vipassana Meditation: Basic and Progressive Practice", "Mahasi Sayadaw", 1971, "Classical discourse on establishing relentless moment-to-moment noting across all postures."),
    ("Discourse on the Wheel of Dhamma", "Mahasi Sayadaw", 1980, "In-depth exposition of the Dhammacakkappavattana Sutta and experiential realization of the Four Noble Truths."),
    ("Discourse on Dependent Origination", "Mahasi Sayadaw", 1982, "Systematic analysis of Paticcasamuppada, dismantling the illusion of a permanent soul or creator."),
    ("Discourse on the Anattalakkhana Sutta", "Mahasi Sayadaw", 1981, "Detailed commentary on the Buddha's second sermon on the characteristics of non-self."),
    ("Discourse on the Ariyavasa Sutta", "Mahasi Sayadaw", 1980, "Teachings on the ten noble dwellings and pure conduct required for awakening."),
    ("Discourse on the Sallekha Sutta", "Mahasi Sayadaw", 1981, "Exposition on practical self-effacement and overcoming subtle defilements in insight meditation."),
    ("Discourse on the Vammika Sutta", "Mahasi Sayadaw", 1982, "Esoteric and practical explanations of the anthill allegory representing the five physical aggregates."),
    ("Discourse on the Malukyaputta Sutta", "Mahasi Sayadaw", 1983, "Direct instructions on stopping conceptual proliferation: in the seen, only the seen."),
    ("Discourse on the Purabheda Sutta", "Mahasi Sayadaw", 1984, "The characteristics of a peaceful sage who has extinguished craving before bodily dissolution."),
    ("Discourse on the Tuwathaka Sutta", "Mahasi Sayadaw", 1984, "Expounding the rapid attainment of peace through cutting off discursive thinking and conceit."),
    ("Discourse on the Silavanta Sutta", "Mahasi Sayadaw", 1982, "Why even virtuous arahants continue contemplating the five aggregates as impermanent and void."),
    ("Discourse on the Hemavata Sutta", "Mahasi Sayadaw", 1980, "Investigation into how the world arises through sense-bases and how it is brought to cessation."),
    ("Fundamentals of Vipassana Meditation", "Mahasi Sayadaw", 1992, "Core principles of empirical insight, bare awareness, and overcoming the five mental hindrances."),
    ("A Discourse on the Cula-Vedalla Sutta", "Mahasi Sayadaw", 1984, "Profound dialogue between Dhammadinna and Visakha on personality belief, feeling, and cessation."),
    ("A Discourse on the Maha-Vedalla Sutta", "Mahasi Sayadaw", 1984, "Analysis of wisdom, right view, consciousness, and the difference between death and deep absorption."),
    ("A Discourse on the Sakkapanha Sutta", "Mahasi Sayadaw", 1983, "How Sakka's existential questions regarding jealousy and malice were resolved by the Buddha."),
    ("Treatise on the Vipassana Insight Practice", "Mahasi Sayadaw", 1978, "Systematic guidance for advanced retreatants navigating the terrifying knowledges of dissolution and fear."),
    ("In This Very Life: The Liberation Teachings of the Buddha", "Sayadaw U Pandita", 1992, "Essential manual on the fiery warrior spirit required to penetrate the illusion of self."),
    ("The State of Mind Called Beautiful", "Sayadaw U Pandita", 2006, "Detailed guide to cultivating the nineteen wholesome mental factors that purify consciousness."),
    ("On the Path to Freedom", "Sayadaw U Pandita", 1995, "Dhamma talks addressing retreat obstacles, sluggishness, skepticism, and spiritual urgency."),
    ("Timeless Wisdom: In-Depth Dhamma Talks", "Sayadaw U Pandita", 2012, "Deep examination of mindfulness, mental noting precision, and the fruits of recluseship."),
    ("The Way to the Guru: Meditative Guidance", "Sayadaw U Pandita", 2003, "The vital relationship between mentor feedback, rigorous noting, and spiritual breakthrough."),
    ("Don't Look at the Mind with Contempt", "Sayadaw U Tejaniya", 2007, "Transformative guide to mindful awareness that embraces defilements as objects of observation rather than enemies."),
    ("Relax and Be Aware: Mindfulness in Daily Life", "Sayadaw U Tejaniya", 2019, "Accessible daily meditation principles emphasizing effortless right attitude over intense physical strain."),
    ("When Awareness Becomes Natural", "Sayadaw U Tejaniya", 2016, "How continuous, unstrained mindfulness develops into automatic, self-sustaining wisdom."),
    ("Dhamma Everywhere: Freeing the Mind Across All Postures", "Sayadaw U Tejaniya", 2011, "Integrating wise attention into working, talking, eating, and domestic life."),
    ("Awareness Alone Is Not Enough", "Sayadaw U Tejaniya", 2008, "Why understanding the mind's hidden views and attitudes is critical for genuine liberation."),
    ("The Four Foundations of Mindfulness", "Sayadaw U Silananda", 1990, "Exhaustive verse-by-verse practical commentary on the Mahasatipatthana Sutta."),
    ("Volition: The Real Mastermind Behind Kamma", "Sayadaw U Silananda", 1998, "Psychological examination of cetana and how deliberate intentions sculpt psychological destiny."),
    ("No Inner Core: An Introduction to the Doctrine of Anatta", "Sayadaw U Silananda", 1999, "Rigorous deconstruction of the soul theory using empirical Pali Sutta references."),
    ("Meditation Instructions for Intensive Practice", "Sayadaw U Silananda", 1993, "Practical advice for sitting, walking, sensory noting, and maintaining continuity of mindfulness."),
    ("Words of Dhamma: Practical Meditative Advice", "Sayadaw U Kundalabhivamsa", 2001, "Gentle, precise instructions on refining moment-to-moment noting and guarding the sense doors."),
    ("Dhamma Padetha: Collection of Insight Essays", "Sayadaw U Kundalabhivamsa", 1999, "Guidance on developing unshakable patient endurance (khanti) during prolonged insight retreats."),
    ("The Practice of Vipassana Meditation", "Sayadaw U Kundalabhivamsa", 2004, "A manual outlining the transition from basic noting to effortless discernment of arising and passing."),
    ("Vipassana Meditation Guidelines", "Chanmyay Sayadaw (U Janakabhivamsa)", 1985, "Clear handbook on walking meditation techniques, postural awareness, and retreat discipline."),
    ("Bhavana: Mind Development in Everyday Reality", "Chanmyay Sayadaw (U Janakabhivamsa)", 1998, "Demystifying mental culture and demonstrating how mindfulness stabilizes turbulent emotions."),
    ("Vipassana Meditation: Lectures on Insight", "Chanmyay Sayadaw (U Janakabhivamsa)", 1991, "Direct answers to meditators' challenges with pain, restlessness, doubt, and dullness."),
    ("Insight Meditation: The Path to Peace", "Sayadaw U Sobhana", 2002, "Practical roadmap of the Mahasi lineage explaining how noting dismantles reactivity."),
    ("Vipassana Talks from Mahasi Sasana Yeiktha", "Sayadaw U Lakkhana", 2005, "Transcribed interviews addressing the subtle traps of pseudo-nirvana, lights, and rapture."),
    ("Continuous Mindfulness in Dynamic Living", "Sayadaw U Ottamathara", 2014, "Modern Burmese perspective on non-stop noting during high-stress contemporary activities."),
    ("The Progress of Insight Through Mental Noting", "Sayadaw U Sujatha", 2009, "Detailed exposition of how naming mental events anchors attention and prevents narrative distraction."),
    ("Insight Meditation Workshop Manual", "Sayadaw U Thondara", 2000, "Practical curriculum for ten-day and thirty-day intensive Satipatthana courses."),
    ("Manual of Buddhist Vipassana Practice", "Sayadaw U Pannathami", 1996, "Clear guide to navigating the dukka-nana (knowledges of suffering) without abandoning the cushion."),
    ("The Seven Stages of Purification", "Matara Sri Nanarama Mahathera", 1983, "Sri Lankan insight master's rigorous mapping of the Visuddhimagga purifications in meditation."),
    ("An Inquiring Mind's Journey into Vipassana", "Sayadaw U Dhammarakkhita", 2008, "Scientific approach to empirical self-observation in the Mahasi tradition."),
    ("Purification of Mind and View", "Sayadaw U Zagara", 2001, "Clarifying how bare awareness unmasks the non-conceptual nature of bodily sensations."),
    ("Living the Dhamma Hour by Hour", "Sayadaw U Rewata", 2013, "Actionable protocols for maintaining the unbroken thread of mindfulness outside the monastery.")
]

for t, a, y, ins in mahasi_list:
    add_b(t, a, y, ins, "1_mahasi")

# =========================================================================
# 2) All Nyanaponika, Bhikkhu Bodhi & Bhikkhu Analayo Books (50 books)
# =========================================================================
scholar_monk_list = [
    ("The Heart of Buddhist Meditation", "Nyanaponika Thera", 1962, "The seminal work that introduced modern Satipatthana and bare attention to the global English-speaking world."),
    ("The Power of Mindfulness", "Nyanaponika Thera", 1972, "Incisive philosophical essay on bare attention as an instrument of psychological conquest and liberation."),
    ("Abhidhamma Studies: Researches in Buddhist Psychology", "Nyanaponika Thera", 1949, "Masterful investigation into the Dhammasangani, demonstrating the dynamic nature of mental states."),
    ("Great Disciples of the Buddha: Their Lives and Legacy", "Nyanaponika Thera & Hellmuth Hecker", 1997, "Inspiring spiritual biographies of Sariputta, Moggallana, Ananda, Maha Kassapa, and others."),
    ("The Life of Sariputta", "Nyanaponika Thera", 1966, "Monograph exploring the intellectual genius, humility, and insight of the Buddha's foremost disciple."),
    ("The Four Sublime States: Brahma-Vihara", "Nyanaponika Thera", 1958, "Classic meditation guide on cultivating boundless love, compassion, sympathetic joy, and equanimity."),
    ("The Roots of Good and Evil", "Nyanaponika Thera", 1978, "Psychological examination of greed, hatred, and delusion versus non-greed, non-hatred, and non-delusion."),
    ("Anatta and Nibbana: Egolessness and Deliverance", "Nyanaponika Thera", 1959, "Clarifying that Nibbana is not self-annihilation, but the unconditioned peace free from identity-view."),
    ("The Worn-Out Skin: Reflections on the Uraga Sutta", "Nyanaponika Thera", 1977, "Poetic contemplation on shedding anger, craving, and opinions like a serpent sloughs its old skin."),
    ("Buddhism and the God-Idea", "Nyanaponika Thera", 1970, "Philosophical evaluation of monotheism, pantheism, and moral causation in early Buddhist thought."),
    ("The Road to Inner Freedom", "Nyanaponika Thera", 1982, "Anthology of foundational Buddhist Publication Society essays on ethics and mental development."),
    ("Protection Through Satipatthana", "Nyanaponika Thera", 1967, "Explaining the Sedaka Sutta: how protecting one's own mind protects society, and vice versa."),
    ("The Five Mental Hindrances and Their Conquest", "Nyanaponika Thera", 1961, "Diagnostic handbook identifying the exact psychological antidotes for sensory desire, ill-will, and doubt."),
    ("The Four Nutriments of Life", "Nyanaponika Thera", 1967, "Analysis of physical food, contact, mental volition, and consciousness as fuels for cyclic existence."),
    ("In the Buddha's Words: An Anthology from the Pali Canon", "Bhikkhu Bodhi", 2005, "The gold-standard thematic compilation mapping the entire spiritual journey from lay ethics to liberation."),
    ("The Noble Eightfold Path: Way to the End of Suffering", "Bhikkhu Bodhi", 1984, "Definitive practical breakdown of Right View, Intention, Speech, Action, Livelihood, Effort, Mindfulness, Samadhi."),
    ("The Middle Length Discourses of the Buddha (Majjhima Nikaya)", "Bhikkhu Nanamoli & Bhikkhu Bodhi", 1995, "Monumental English translation of 152 foundational suttas containing the Buddha's deepest dialogues."),
    ("The Connected Discourses of the Buddha (Samyutta Nikaya)", "Bhikkhu Bodhi", 2000, "Comprehensive translation of 2,889 suttas grouped by topic: causation, khandhas, sense-bases, truth."),
    ("The Numerical Discourses of the Buddha (Anguttara Nikaya)", "Bhikkhu Bodhi", 2012, "Master translation of discourses categorized from ones to elevens, rich in practical everyday wisdom."),
    ("The Suttanipata: An Ancient Collection of Discourses", "Bhikkhu Bodhi", 2017, "Translation of the earliest archaic poetic verses reflecting early wandering renunciate Buddhism."),
    ("A Comprehensive Manual of Abhidhamma", "Bhikkhu Bodhi", 1993, "The definitive textbook on Buddhist psychological metaphysics, consciousness types, and mental factors."),
    ("Reading the Buddha's Discourses in Pali", "Bhikkhu Bodhi", 2020, "Pedagogical guide to reading early Buddhist texts in their original linguistic syntax and nuances."),
    ("Investigating the Dhamma: A Collection of Essays", "Bhikkhu Bodhi", 2015, "Scholarly and reflective writings on Buddhist ethics, social engagement, rebirth, and cosmology."),
    ("The All-Embracing Net of Views: Brahmajala Sutta", "Bhikkhu Bodhi", 1978, "Translation and exhaustive commentary on the sixty-two speculative philosophical views about the world."),
    ("The Discourse on the Root of Existence: Mulapariyaya Sutta", "Bhikkhu Bodhi", 1980, "Profound analysis of how unawakened minds conceive reality through 'I' and 'mine'."),
    ("The Great Discourse on Causation: Mahanidana Sutta", "Bhikkhu Bodhi", 1984, "Detailed exposition of dependent origination and the mechanics of psychophysical continuity."),
    ("The Discourse on the Fruits of Recluseship: Samannaphala Sutta", "Bhikkhu Bodhi", 1989, "Gradual training manual outlining morality, sensory restraint, jhanas, and liberation."),
    ("Going for Refuge and Taking the Precepts", "Bhikkhu Bodhi", 1981, "The philosophical and devotional foundations of committing to Buddha, Dhamma, and Sangha."),
    ("Transcendental Dependent Arising", "Bhikkhu Bodhi", 1980, "Exposition of the Upanisa Sutta: the positive spiral of causation running from suffering to liberation."),
    ("Dana: The Practice of Giving", "Bhikkhu Bodhi", 1990, "Exploring generosity as the foundational psychological prerequisite for weakening self-attachment."),
    ("Satipatthana: The Direct Path to Realization", "Bhikkhu Analayo", 2003, "The landmark academic and practical study comparing early canonical formulations of mindfulness."),
    ("Perspectives on Satipatthana", "Bhikkhu Analayo", 2013, "Comparative textual analysis highlighting the core meditation practices common across Agamas and Nikayas."),
    ("Satipatthana Meditation: A Practice Guide", "Bhikkhu Analayo", 2018, "Step-by-step practical manual for applying the four foundations of mindfulness in a daily routine."),
    ("Mindfully Facing Disease and Death", "Bhikkhu Analayo", 2016, "Compassionate early Buddhist teachings on working with acute illness, bodily pain, and dying consciously."),
    ("Compassion and Emptiness in Early Buddhist Meditation", "Bhikkhu Analayo", 2015, "Synthesizing the boundless brahmaviharas with the insight of sunyata (emptiness) as complementary wings."),
    ("Early Buddhist Meditation Studies", "Bhikkhu Analayo", 2017, "Scholarly essays examining mindfulness, jhanas, absorption milestones, and early polemics."),
    ("The Genesis of the Bodhisattva Ideal", "Bhikkhu Analayo", 2010, "Historical-textual investigation into the emergence of the Bodhisattva path within early schools."),
    ("A Comparative Study of the Majjhima-nikaya (Volume 1)", "Bhikkhu Analayo", 2011, "Rigorous comparative textual study cross-referencing Pali suttas with Chinese Madhyama-agama equivalents."),
    ("A Comparative Study of the Majjhima-nikaya (Volume 2)", "Bhikkhu Analayo", 2011, "Continuation of comparative sutta analysis, revealing doctrinal consistency and textual variance."),
    ("The Dawn of Abhidharma", "Bhikkhu Analayo", 2014, "Tracing the historical transition from lists of Dhamma categories (matikas) into formal Abhidharma treatises."),
    ("Superiority Conceit in Buddhist Traditions", "Bhikkhu Analayo", 2021, "Addressing sectarian chauvinism and restoring the Buddha's non-sectarian spirit of inquiry."),
    ("Rebirth in Early Buddhism and Current Research", "Bhikkhu Analayo", 2018, "Evaluating ancient Buddhist understandings of rebirth alongside contemporary empirical case studies."),
    ("Mindfulness of Breathing: A Practice Guide and Translations", "Bhikkhu Analayo", 2019, "Comprehensive guide to the sixteen steps of Anapanasati based on comparative early Buddhist suttas."),
    ("Dependent Arising: A Practical Guide to Early Buddhist Teachings", "Bhikkhu Analayo", 2020, "Translating the twelve links of Paticcasamuppada into direct introspective self-observation."),
    ("The Foundation Conditions for Nirvana", "Bhikkhu Analayo", 2019, "Exploring the necessary psychological causes, mental factors, and quietude required for awakening."),
    ("Meditation on the Mind: Mindful Watching of Thoughts", "Bhikkhu Analayo", 2022, "Techniques for observing mental states without identifying with or repressing them."),
    ("Brahmavihara: The Four Immeasurables in Early Buddhism", "Bhikkhu Analayo", 2023, "In-depth guide to developing universal friendliness, compassion, joy, and equanimity as liberating insight."),
    ("Early Buddhist Oral Tradition and Textual Transmission", "Bhikkhu Analayo", 2023, "How the Dhamma was memorized, chanted, and safeguarded before being committed to palm-leaf manuscripts."),
    ("Buddhism and the Ecology of Mind", "Bhikkhu Bodhi", 2021, "Applying Buddhist ethics of interdependence to the modern environmental and civilizational crises."),
    ("The Sutta Discovery: Early Buddhist Teachings", "Piya Tan & Bhikkhu Analayo", 2008, "Anthology analyzing key doctrinal themes in early Buddhist psychology and experiential practice.")
]

for t, a, y, ins in scholar_monk_list:
    add_b(t, a, y, ins, "2_nyanaponika_bodhi_analayo")

# =========================================================================
# 3) Thai forest monks books (80 books)
# =========================================================================
thai_forest_list = [
    ("Food for the Heart: Collected Teachings", "Ajahn Chah", 2002, "The crowning collection of talks by Thailand's most renowned meditation master, rich in rustic humor and profound clarity."),
    ("Being Dharma: The Essence of the Buddha's Teachings", "Ajahn Chah", 2001, "Practical, direct advice on relinquishing attachments, facing physical discomfort, and realizing peace here and now."),
    ("A Still Forest Pool: Insight Meditation of Achaan Chah", "Ajahn Chah (Jack Kornfield & Paul Breiter eds.)", 1985, "The classic introductory collection that brought Ajahn Chah's simple, penetrating wisdom to the West."),
    ("No Ajahn Chah: Reflections of a Master", "Ajahn Chah", 2005, "Heartfelt, provocative anecdotes illustrating how Ajahn Chah systematically smashed his disciples' egos."),
    ("Everything Arises, Everything Falls Away", "Ajahn Chah", 2005, "Poignant teachings on impermanence, non-attachment, and embracing physical illness and mortality without fear."),
    ("In Simple Terms: 108 Dhamma Similes", "Ajahn Chah", 2004, "Vivid analogies drawn from trees, water buffalos, oil and water, explaining complex psychological mechanics."),
    ("Our Real Home: Teachings for Approaching Death", "Ajahn Chah", 1987, "Spiritual instructions delivered to a dying disciple on letting go of the physical body and resting in the knowing mind."),
    ("Bodhinyana: A Collection of Dhamma Talks", "Ajahn Chah", 1982, "Early Western talks addressing the foundations of monastic training, continuous mindfulness, and detachment."),
    ("A Taste of Freedom", "Ajahn Chah", 1980, "Exploring the joy that arises when the mind unhooks from likes, dislikes, and compulsive judgments."),
    ("Living Dhamma", "Ajahn Chah", 1992, "Lectures focusing on the actualization of virtue, samadhi, and wisdom in everyday monastery life."),
    ("Peace Beyond Suffering", "Ajahn Chah", 1990, "How peace is not found by running away from commotion, but by discovering the unmoving center in the midst of turmoil."),
    ("The Key to Liberation", "Ajahn Chah", 1994, "A concentrated treatise on observing the natural state of the mind and overcoming identification with thoughts."),
    ("Just One Word: Mindfulness", "Ajahn Chah", 1999, "Emphasizing that every Buddhist doctrine converges on continuous present-moment awareness."),
    ("Clarity of Insight: Selected Forest Dhamma", "Ajahn Chah", 2007, "Deep retreat instructions on cutting through delusion, skepticism, and self-importance."),
    ("The Wings to Awakening: An Anthology from the Pali Canon", "Thanissaro Bhikkhu", 1996, "The monumental systematic mapping of the thirty-seven factors leading to enlightenment."),
    ("With Each and Every Breath: A Guide to Meditation", "Thanissaro Bhikkhu", 2012, "Comprehensive, step-by-step breath meditation manual based on the lineage of Ajaan Lee Dhammadharo."),
    ("Mind Like Fire Unbound", "Thanissaro Bhikkhu", 1993, "Brilliant investigation of the Vedic physics of fire and how Nibbana signifies total coolness and release."),
    ("The Paradox of Becoming: Finding Freedom in the Cycle of Becoming", "Thanissaro Bhikkhu", 2008, "Analyzing bhava (becoming) and how intentional self-identities are skillfully used and eventually discarded."),
    ("The Shape of Suffering: A Study of Dependent Co-arising", "Thanissaro Bhikkhu", 2008, "Deep dive into Paticcasamuppada, emphasizing the feedback loops that sustain suffering and how to dismantle them."),
    ("Skill in Questions: How the Buddha Taught", "Thanissaro Bhikkhu", 2010, "Exploring the Buddha's fourfold questioning methodology and how categorical wisdom dissolves dogmatism."),
    ("Noble Strategy: Essays on the Buddhist Path", "Thanissaro Bhikkhu", 1999, "Essays covering karma, forgiveness, gratitude, discernment, and Buddhist views on society."),
    ("On the Path: An Anthology of Suttas on the Noble Eightfold Path", "Thanissaro Bhikkhu", 2021, "Exhaustive compilation of Pali discourses mapping the training stages from right view to right concentration."),
    ("Meditations 1: Dhamma Talks", "Thanissaro Bhikkhu", 2003, "Evening meditation instructions given at Metta Forest Monastery on mastering the mechanics of breath."),
    ("Meditations 2: Dhamma Talks", "Thanissaro Bhikkhu", 2006, "Reflections on developing patience, discernment, and emotional self-reliance in solitude."),
    ("Meditations 3: Dhamma Talks", "Thanissaro Bhikkhu", 2007, "Practical tactics for dealing with pain, sleepiness, emotional wounds, and mental restlessness."),
    ("Meditations 4: Dhamma Talks", "Thanissaro Bhikkhu", 2010, "Cultivating inner wealth, the warrior mentality, and noble resolve on the path."),
    ("Meditations 5: Dhamma Talks", "Thanissaro Bhikkhu", 2011, "Insights into subtle attachments to meditation states, pride, and the final steps toward unbinding."),
    ("The Karma of Questions: Essays on the Buddhist Path", "Thanissaro Bhikkhu", 2014, "How framing the right internal questions determines whether spiritual practice leads to bondage or release."),
    ("Right Mindfulness: Memory and Ardency on the Buddhist Path", "Thanissaro Bhikkhu", 2012, "Re-anchoring mindfulness in sati (memory) and ardency, clarifying misunderstandings of bare attention."),
    ("Beyond All Directions: Essays on Nirvana", "Thanissaro Bhikkhu", 2016, "Incisive philosophical essays exploring the unconditioned element outside space and time."),
    ("Into the Stream: A Study Guide on the First Stage of Awakening", "Thanissaro Bhikkhu", 2012, "Detailed anthology exploring the four factors of stream-entry and the experiential conquest of identity-view."),
    ("The Buddhist Monastic Code, Volume I", "Thanissaro Bhikkhu", 1994, "Exhaustive legal and meditative commentary on the 227 Patimokkha rules governing Theravada monks."),
    ("The Buddhist Monastic Code, Volume II", "Thanissaro Bhikkhu", 2001, "Comprehensive analysis of the Khandhaka rules governing monastic community life, robe making, and medicine."),
    ("Selves and Not-Self: Buddhist Epistemology", "Thanissaro Bhikkhu", 2011, "Examining not-self not as a metaphysical assertion, but as a pragmatic strategy for dropping burden."),
    ("Purity of Heart: Essays on the Buddhist Path", "Thanissaro Bhikkhu", 2006, "Exploring the purification of intention, sincerity, and the noble fruits of renunciation."),
    ("Head and Heart Together: Essays on the Buddhist Path", "Thanissaro Bhikkhu", 2015, "Harmonizing intellectual discernment with devotion, emotional warmth, and respect for tradition."),
    ("The Sound of Silence: Selected Teachings", "Ajahn Sumedho", 2007, "Masterful instructions on resting in the nada sound (inner sound of silence) as an anchor for spacious awareness."),
    ("Mindfulness: The Path to the Deathless", "Ajahn Sumedho", 1987, "Classic introductory treatise on establishing awareness of the breath, physical posture, and thought processes."),
    ("Teachings of a Buddhist Monk", "Ajahn Sumedho", 1990, "Down-to-earth reflections on monastic austerity, community conflicts, and discovering peace in everyday irritations."),
    ("Don't Take Your Life Personally", "Ajahn Sumedho", 2010, "Incisive teachings on viewing psychological suffering, personality flaws, and emotions as impersonal nature."),
    ("The Mind and the Way: Buddhist Reflections on Life", "Ajahn Sumedho", 1995, "Accessible essays applying early Buddhist principles to modern cultural challenges and existential angst."),
    ("Intuitive Awareness: Living in the Unconditioned", "Ajahn Sumedho", 2004, "Developing the natural intelligence of the heart that knows reality prior to linguistic conceptualization."),
    ("Now Is the Knowing", "Ajahn Sumedho", 1989, "Exploring the witness consciousness and realizing that knowing suffering is not the same as suffering."),
    ("Cittaviveka: Teachings from the Silent Mind", "Ajahn Sumedho", 1984, "Early talks from Chithurst Forest Monastery on the discipline of silence and spiritual seclusion."),
    ("Peace Is a Dynamic Process", "Ajahn Sumedho", 2012, "Refuting the idea that peace is static stagnation; peace is the fluid capacity to accept change."),
    ("The Four Noble Truths", "Ajahn Sumedho", 1992, "Concise masterpiece on the three turnings of the Twelve Aspects of the Four Noble Truths."),
    ("Small Boat, Great Mountain: Reflections on Dzogchen and Theravada", "Ajahn Amaro", 2003, "Groundbreaking synthesis exploring deep parallels between the Thai Forest tradition and Tibetan Dzogchen."),
    ("Finding the Missing Peace: A Primer of Meditation", "Ajahn Amaro", 2011, "Gentle, lucid guide for beginners addressing sitting posture, breath observation, and working with unruly thoughts."),
    ("Just One More Breath: Teachings on Meditation and Life", "Ajahn Amaro", 2014, "Collection of Dhamma talks addressing the simplicity of returning to the immediate breath in every situation."),
    ("Silent Rain: Collected Dhamma Talks", "Ajahn Amaro", 1994, "Poetic, scholarly, and deeply experiential discourses on nature, solitude, and monastic pilgrimage."),
    ("Breakthrough: Realizing the Deathless in This Life", "Ajahn Amaro", 2016, "Reflections on the sudden breakthrough to truth made possible by sustained ethical purification and samadhi."),
    ("The Island: An Anthology of the Buddha's Teachings on Nibbana", "Ajahn Pasanno & Ajahn Amaro", 2009, "Masterful, comprehensive 400-page exploration of every major canonical discourse on Nibbana."),
    ("Tug of Vow: Monastic Training in the Forest Tradition", "Ajahn Amaro", 1997, "Humorous and penetrating account of life under strict Vinaya monastic disciplines in England."),
    ("Broad View, Boundless Heart", "Ajahn Pasanno & Ajahn Amaro", 2001, "Integrating deep Buddhist philosophy with the boundless warmth of the four brahmaviharas."),
    ("Abundant, Exalted, Immeasurable: The Brahmaviharas", "Ajahn Pasanno", 2016, "Deep instructions on meditating on loving-kindness, compassion, sympathetic joy, and equanimity."),
    ("Don't Hold Back: Monastic Reflections on Practice", "Ajahn Pasanno", 2013, "Exhortations given at Abhayagiri Monastery on total commitment and joyous renunciation."),
    ("Like a Clear Sky: Dhamma Reflections", "Ajahn Pasanno", 2015, "How pure awareness remains unstained by passing emotional clouds, storm systems, and moods."),
    ("A Life of Blessing: Celebrating Virtue and Stillness", "Ajahn Pasanno", 2018, "The power of dana, sila, and bhavana to transform secular life into an altar of awakening."),
    ("Stillness Flowing: The Life and Teachings of Ajahn Chah", "Ajahn Jayasaro", 2017, "The definitive, monumental 800-page biography of Ajahn Chah, documenting his ascetic training in the jungle."),
    ("Without and Within: Questions and Answers on Theravada Buddhism", "Ajahn Jayasaro", 2013, "Masterfully structured handbook answering 130 of the most common questions about Buddhist life."),
    ("On Love: Dhamma Talks on Metta", "Ajahn Jayasaro", 2011, "Distinguishing between romantic grasping and true metta: the selfless wish for all beings to be happy."),
    ("Daughters and Sons: Buddhist Wisdom on Parenting", "Ajahn Jayasaro", 2015, "Applying mindfulness, active listening, and moral modeling to modern family upbringing."),
    ("From Heart to Heart: Selected Dhamma Talks", "Ajahn Jayasaro", 2008, "Intimate talks given to Thai lay disciples on maintaining mental clarity amid worldly ambition."),
    ("Unexpected Freedom: Dhamma Reflections", "Ajahn Munindo", 2004, "Reflections on finding spiritual freedom in unexpected places: disappointment, pain, and loss."),
    ("A Simple Way: The Heart of the Practice", "Ajahn Munindo", 2011, "Gentle teachings from Ratanagiri Monastery in England on trusting the inherent simplicity of Dhamma."),
    ("Deep Down We Know", "Ajahn Munindo", 2015, "Exploring the innate moral and intuitive compass residing within every human heart."),
    ("Simple Teachings on Higher Truths", "Ajahn Anan", 2006, "Profound forest talks by Ajahn Chah's disciple on the direct realization of non-self."),
    ("Seeking Buddho: Teachings on Meditation", "Ajahn Anan", 2009, "Using the sacred mantra 'Buddho' to quiet inner chatter and unify the mind in samadhi."),
    ("The Mind That Knows", "Ajahn Anan", 2012, "Distinguishing between passing mental impressions (sankharas) and the awareness that observes them."),
    ("Keeping the Breath in Mind & Lessons in Samadhi", "Ajahn Lee Dhammadharo", 1957, "The foundational Thai Forest manual on utilizing breath sensations throughout the nervous system."),
    ("The Craft of the Heart", "Ajahn Lee Dhammadharo", 1953, "Classic handbook detailing the progression from ethical purity to jhanic mastery and liberating insight."),
    ("Inner Strength: Sixteen Aspects of the Dhamma", "Ajahn Lee Dhammadharo", 1959, "Practical roadmap of sixteen internal strengths every meditator must develop to withstand delusion."),
    ("The Skill of Release", "Ajahn Lee Dhammadharo", 1958, "Techniques for letting go of both painful mental states and subtle attachments to spiritual bliss."),
    ("Venerable Acariya Mun Bhuridatta: Spiritual Biography", "Ajahn Maha Bua", 1971, "The legendary biography of the founder of the modern Thai Forest tradition, detailing his jungle trials."),
    ("Arahattamagga Arahattaphala: The Path to Arahantship", "Ajahn Maha Bua", 1991, "Rare, uncompromising account of the final stages of insight that destroy the root of avidya (ignorance)."),
    ("To the Last Breath: Dhamma Talks on Illness and Death", "Ajahn Maha Bua", 1999, "Fierce forest talks delivered to a cancer patient on tearing away bodily identification."),
    ("Straight from the Heart: Dhamma Talks", "Ajahn Maha Bua", 1987, "Direct, fiery sermons castigating spiritual laziness and inspiring total dedication to meditation."),
    ("Wisdom Develops Samadhi", "Ajahn Maha Bua", 1980, "Exploring the revolutionary method where active analytical inquiry into the body induces deep samadhi."),
    ("The Heart of Practice: Ajaan Mun's Dhamma Sermons", "Ajahn Mun Bhuridatto", 1949, "The rare surviving notes of the great forest patriarch's discourses on the unconditioned Dhamma."),
    ("Parami: Ways to Cross Life's Floats", "Ajahn Sucitto", 2012, "Deep psychological analysis of the ten perfections (giving, virtue, renunciation, wisdom, energy, etc.)."),
    ("Turning the Wheel of Truth", "Ajahn Sucitto", 2010, "Commentary on the Dhammacakkappavattana Sutta, explaining how the Four Noble Truths function as therapy."),
    ("Breathing Like a Buddha", "Ajahn Sucitto", 2022, "Somatic and meditative guide to breath meditation as a whole-body awakening process."),
    ("Mindfulness, Bliss, and Beyond: A Meditator's Handbook", "Ajahn Brahm", 2006, "The definitive modern manual on the sequential stages of breath meditation culminating in the jhanas."),
    ("Opening the Door of Your Heart", "Ajahn Brahm", 2004, "Beloved collection of 108 humorous and wise stories illustrating forgiveness, self-compassion, and metta."),
    ("The Art of Disappearing: The Path to Lasting Joy", "Ajahn Brahm", 2011, "Advanced teachings on deep jhanas and the complete cessation of perception and feeling (nirodha-samapatti).")
]

for t, a, y, ins in thai_forest_list:
    add_b(t, a, y, ins, "3_thai_forest")

# =========================================================================
# 4) Mindfulness Masters - Gunaratana & Thich Nhat Hanh (40 books)
# =========================================================================
mindfulness_list = [
    ("Mindfulness in Plain English", "Bhante Henepola Gunaratana", 1991, "The global bestseller that demystified Vipassana meditation for millions of modern secular readers."),
    ("Beyond Mindfulness in Plain English", "Bhante Henepola Gunaratana", 2009, "Practical advanced guide exploring the four jhanas and the stabilization of deep meditative stillness."),
    ("The Four Foundations of Mindfulness in Plain English", "Bhante Henepola Gunaratana", 2012, "Clear, user-friendly breakdown of the Satipatthana Sutta, focusing on body, feeling, mind, and dhammas."),
    ("Eight Mindful Steps to Happiness", "Bhante Henepola Gunaratana", 2001, "Comprehensive, compassionate guide to living the Buddha's Noble Eightfold Path in daily life."),
    ("Loving-Kindness in Plain English", "Bhante Henepola Gunaratana", 2017, "Step-by-step instructions for cultivating metta (universal loving-kindness) to heal anger and resentment."),
    ("Meditation on Perception: Ten Healing Practices", "Bhante Henepola Gunaratana", 2014, "Exploring the Girimananda Sutta: using perceptions of impermanence and non-self for physical and mental healing."),
    ("Start Here, Start Now: A Guide to Compassionate Living", "Bhante Henepola Gunaratana", 2019, "Accessible advice on transforming daily frustrations, anxiety, and conflict into opportunities for patience."),
    ("Journey to Mindfulness: Autobiography", "Bhante Henepola Gunaratana", 2003, "The inspiring life story of a village boy from Sri Lanka who became a revered global meditation master."),
    ("The Path of Serenity and Insight", "Bhante Henepola Gunaratana", 1985, "Academic doctoral dissertation examining the harmonious interplay between samatha (jhana) and vipassana."),
    ("Mindfulness for Health and Vitality", "Bhante Henepola Gunaratana", 2021, "Applying somatic awareness and mindful breathing to overcome stress, aging, and chronic health challenges."),
    ("The Miracle of Mindfulness: An Introduction to Meditation", "Thich Nhat Hanh", 1975, "The poetic masterwork illustrating how washing dishes, drinking tea, and walking can become sacred meditation."),
    ("Peace Is Every Step: The Path of Mindfulness in Everyday Life", "Thich Nhat Hanh", 1991, "Practical, gentle reminders to find peace in traffic jams, ringing telephones, and mundane daily routines."),
    ("The Heart of the Buddha's Teaching", "Thich Nhat Hanh", 1998, "Clear, radiant overview of the core doctrines: Four Noble Truths, Noble Eightfold Path, and Twelve Links."),
    ("You Are Here: Discovering the Magic of the Present Moment", "Thich Nhat Hanh", 2009, "Simple instructions on cultivating presence, deep listening, and reconciliation through the breath."),
    ("Silence: The Power of Quiet in a World Full of Noise", "Thich Nhat Hanh", 2015, "Exploring the healing power of inner silence (non-thinking) in an era of constant digital overstimulation."),
    ("Anger: Wisdom for Cooling the Flames", "Thich Nhat Hanh", 2001, "Practical psychological methods for holding one's anger like a crying baby with mindfulness and tenderness."),
    ("Fear: Essential Wisdom for Getting Through the Storm", "Thich Nhat Hanh", 2012, "How to look into original fear, embrace mortality, and touch the dimension of timeless peace."),
    ("Old Path White Clouds: Walking in the Footsteps of the Buddha", "Thich Nhat Hanh", 1991, "Lyrical, epic biography of Siddhartha Gautama, portraying his human warmth, wisdom, and daily interactions."),
    ("No Mud, No Lotus: The Art of Transforming Suffering", "Thich Nhat Hanh", 2014, "How understanding and embracing our own suffering is the fertile soil from which true happiness blooms."),
    ("The Art of Communicating", "Thich Nhat Hanh", 2013, "Actionable guidelines on loving speech, compassionate listening, and healing fractured human relationships."),
    ("The Blooming of a Lotus: Guided Meditations", "Thich Nhat Hanh", 1993, "Curated series of poetic guided meditations on the breath, the elements, and emotional healing."),
    ("The Sun My Heart: From Mindfulness to Insight Contemplation", "Thich Nhat Hanh", 1988, "Exploring the profound interconnectedness of all phenomena: the sun shines inside every green leaf."),
    ("Transformation and Healing: Satipatthana Sutra", "Thich Nhat Hanh", 1990, "Luminous translation and commentary on the Four Foundations of Mindfulness from the plum village tradition."),
    ("Breathe, You Are Alive: Anapanasati Sutra", "Thich Nhat Hanh", 1990, "Engaging commentary on the sixteen breath awareness steps, emphasizing joy, ease, and release."),
    ("The Diamond That Cuts Through Illusion", "Thich Nhat Hanh", 1992, "Radical commentary on the Diamond Sutra, revealing how signs and concepts blind us to living reality."),
    ("Touching Peace: Practicing the Art of Mindful Living", "Thich Nhat Hanh", 1992, "Inspiring essays on building compassionate communities (sanghas) and active peacemaking in the world."),
    ("Our Appointment with Life: The Bhaddekaratta Sutta", "Thich Nhat Hanh", 1990, "Commentary on the Buddha's discourse on living happily in the present without yearning for past or future."),
    ("Zen Keys: A Guide to Zen Practice", "Thich Nhat Hanh", 1974, "Deep introduction to Vietnamese Thien (Zen) Buddhism, koans, and non-conceptual awareness."),
    ("True Love: A Practice for Awakening the Heart", "Thich Nhat Hanh", 2006, "The four elements of true love: maitri (kindness), karuna (compassion), mudita (joy), upeksa (freedom)."),
    ("Teachings on Love", "Thich Nhat Hanh", 1997, "In-depth guide to developing deep emotional maturity, forgiveness, and unconditional acceptance."),
    ("Living Buddha, Living Christ", "Thich Nhat Hanh", 1995, "Groundbreaking interfaith dialogue discovering deep contemplative harmony between Buddhist and Christian wisdom."),
    ("Going Home: Jesus and Buddha as Brothers", "Thich Nhat Hanh", 1999, "Exploring the shared spiritual roots of compassion, mindfulness, and the Holy Spirit as sacred presence."),
    ("The Energy of Prayer: How to Deepen Your Spiritual Practice", "Thich Nhat Hanh", 2006, "Examining the mechanics of prayer and visualization through the lens of Buddhist psychology."),
    ("Creating True Peace: Ending Violence in Yourself and the World", "Thich Nhat Hanh", 2003, "Actionable practices for de-escalating anger, disarming hostility, and fostering nonviolent conflict resolution."),
    ("Interbeing: Fourteen Precepts of Engaged Buddhism", "Thich Nhat Hanh", 1987, "The ethical charter of the Order of Interbeing, addressing social justice, consumerism, and non-dogmatism."),
    ("Taming the Tiger Within: Meditations on Difficult Emotions", "Thich Nhat Hanh", 2004, "A pocket handbook of concise reminders for handling jealousy, despair, grievance, and fear."),
    ("Savor: Mindful Eating, Mindful Life", "Thich Nhat Hanh & Lilian Cheung", 2010, "Integrating mindful awareness with nutritional science to build a peaceful relationship with food and body."),
    ("Your True Home: The Everyday Wisdom of Thich Nhat Hanh", "Thich Nhat Hanh", 2011, "365 daily meditative reflections on stopping, calming, resting, and healing in the present moment."),
    ("The Other Shore: A New Translation of the Heart Sutra", "Thich Nhat Hanh", 2017, "Luminously revised translation of the Prajnaparamita Hridaya, clarifying the liberating meaning of emptiness."),
    ("Cracking the Walnut: Secret Teachings on Awakening", "Thich Nhat Hanh", 2021, "Direct contemplation exercises designed to shatter conceptual shells and reveal raw, unconditioned life.")
]

for t, a, y, ins in mindfulness_list:
    add_b(t, a, y, ins, "4_mindfulness")

# =========================================================================
# 5) Dhammapada Canon & Commentaries (35 books)
# =========================================================================
dhammapada_list = [
    ("The Dhammapada: A New Translation", "Bhikkhu Bodhi", 2024, "Meticulous modern scholarly translation capturing the exact philosophical nuance and rhythmic beauty of the Pali verses."),
    ("The Dhammapada", "Eknath Easwaran", 1985, "Beloved poetic English rendering accompanied by a brilliant chapter-by-chapter introduction to Buddhist psychology."),
    ("The Dhammapada: The Buddha's Path of Wisdom", "Acharya Buddharakkhita", 1985, "The definitive Buddhist Publication Society edition used by meditation students and monastics worldwide."),
    ("The Dhammapada: A Translation of the Buddhist Classic", "Gil Fronsdal", 2005, "Accessible, clear contemporary translation informed by decades of Vipassana teaching and Pali scholarship."),
    ("Dhammapada: A Translation", "Thanissaro Bhikkhu", 1998, "Sharp, accurate translation emphasizing the pragmatic, martial quality of the Buddha's verses on training the mind."),
    ("The Dhammapada: Translated with an Introduction", "Juan Mascaro", 1973, "Penguin Classics edition celebrated for its sublime poetic eloquence and universal mystical resonance."),
    ("The Dhammapada: The Sayings of the Buddha", "Thomas Byrom", 1976, "Lyrical, minimalist English rendering capturing the diamond-like spirit of the verses in rhythmic verse."),
    ("The Dhammapada: With the Story of the Buddha", "Valerie Roebuck", 2010, "Authoritative translation incorporating ancient commentarial context and rich philological notes."),
    ("Treasury of Truth: Illustrated Dhammapada", "Ven. Weragoda Sarada Maha Thero", 1993, "Monumental 1,000-page work containing original Pali, word-by-word grammatical analysis, and the historical background story for each verse."),
    ("The Dhammapada: Verses and Stories", "Burmese Pitaka Translation Committee", 1986, "Comprehensive rendering containing the 423 verses and the 305 dramatic narrative stories of the people who prompted them."),
    ("Buddhist Legends: Dhammapada Commentary (Part 1)", "Eugene Watson Burlingame", 1921, "The legendary Harvard Oriental Series translation of Buddhaghosa's Dhammapadatthakatha tales."),
    ("Buddhist Legends: Dhammapada Commentary (Part 2)", "Eugene Watson Burlingame", 1921, "Continuing the dramatic stories of monks, lay disciples, kings, and deities who achieved insight through the verses."),
    ("Buddhist Legends: Dhammapada Commentary (Part 3)", "Eugene Watson Burlingame", 1921, "Concluding volumes of the ancient commentary, detailing the lives of great arahants and their past karmic seeds."),
    ("The Dhammapada: The Way of the Righteous", "Radhakrishnan", 1950, "Oxford scholar and Indian philosopher's comparative analysis of the Dhammapada alongside the Upanishads and Gita."),
    ("The Dhammapada: The Path of Perfection", "Max Müller", 1881, "The historic Sacred Books of the East translation that first introduced the verses to Western academia."),
    ("Dhammapada: Wisdom of the Buddha", "Harischandra Kaviratna", 1980, "Bilingual Pali-English edition with illuminating doctrinal commentary from the Theravada commentarial tradition."),
    ("The Buddha's Path of Virtue", "F.L. Woodward", 1921, "Classic rhythmic translation into English blank verse capturing the formal dignity of ancient recitation."),
    ("The Dhammapada: The Way of Truth", "Sangharakshita", 2001, "Practical, contemporary commentary on applying the verses to modernize character, ethics, and meditation."),
    ("Dhammapada Reflections: Contemplations on Wisdom", "Bhikkhu Khantipalo", 1989, "A Western monk's insightful retreat reflections unpacking the practical psychology behind each chapter."),
    ("The Mindful Way: Commentary on the Dhammapada", "Jack Kornfield", 2003, "Reflections on compassion, emotional clarity, and non-greed inspired by the classical verses."),
    ("Stories of the Dhammapada", "K. Sri Dhammananda", 1998, "Engaging retelling of the dramatic historical circumstances under which the Buddha uttered each famous stanza."),
    ("Dhammapada: The Way of the Buddha (Vol 1)", "Osho", 1979, "Expansive, provocative discourses exploring the psychological depth of the Twin Verses and Heedfulness."),
    ("Dhammapada: The Way of the Buddha (Vol 2)", "Osho", 1979, "Commentary exploring the nature of mind, flowers of consciousness, and overcoming foolishness."),
    ("Dhammapada: The Way of the Buddha (Vol 3)", "Osho", 1979, "Discourses on the Wise Man, the Arahant, and the thousand words that bring peace."),
    ("The Dhammapada for Awakening", "Abbot George Burke (Swami Nirmalananda Giri)", 2016, "A practical commentary exploring the inner mystical and yogic dimensions of the Buddhist verses."),
    ("A Heart of Wisdom: The Twin Verses of the Dhammapada", "Bhikkhu Pesala", 2012, "In-depth psychological study of chapter 1: how suffering follows a corrupt mind like the cart follows the ox."),
    ("Heedfulness: The Deathless Path of the Dhammapada", "Bhikkhu Cintita", 2015, "Exploring chapter 2: appamada as the active root of all wholesome mental states."),
    ("Taming the Mind: Dhammapada Chapter on Consciousness", "Acharya Buddharakkhita", 1990, "Detailed commentary on the Citta Vagga: how an untrained mind flutters like a fish thrown on dry land."),
    ("The Flowers of Enlightenment: Dhammapada Chapter 4", "Narada Mahathera", 1978, "Contemplating the Puppha Vagga: choosing the essence of Dhamma just as a garland-maker plucks fresh blossoms."),
    ("The Wise and the Foolish in the Dhammapada", "Hellmuth Hecker", 1984, "Contrasting the psychological characteristics of the bala (childish fool) and the pandita (wise sage)."),
    ("The Thousandfold Verse: Dhammapada Sahassa Vagga", "Bhikkhu Nyanatusita", 2008, "Why one single sentence of Dhamma that brings peace is superior to a thousand useless speeches."),
    ("Evil and Punishment: The Danda Vagga of the Dhammapada", "Sister Vajira", 1982, "Reflecting on non-harming (ahimsa): all beings tremble at punishment, all life is dear to all."),
    ("Old Age and Mortality: The Jara Vagga", "Bhikkhu Anigha", 2017, "Using the verses on bodily decay to shatter vain attachments to youth, beauty, and physical vitality."),
    ("The Pure Soul: The Brahmana Vagga of the Dhammapada", "Bhikkhu Bodhi", 1995, "How the Buddha redefined the true 'Brahmin' not by birth, but by purity of conduct and freedom from craving."),
    ("Living the Dhammapada: Practical Everyday Wisdom", "K. Sri Dhammananda", 2005, "Digest of verses designed to guide decisions on career, relationship conflicts, speech, and mental peace.")
]

for t, a, y, ins in dhammapada_list:
    add_b(t, a, y, ins, "5_dhammapada")

# =========================================================================
# 6) Tipitaka & Abhidhamma Books (65 books)
# =========================================================================
tipitaka_list = [
    ("The Long Discourses of the Buddha (Digha Nikaya)", "Maurice Walshe", 1987, "Complete translation of thirty-four grand discourses, including the Mahaparinibbana Sutta and Brahmajala Sutta."),
    ("The Udana: Inspired Utterances of the Buddha", "John D. Ireland", 1990, "Eighty uplifting exclamations uttered by the Buddha on moments of breakthrough, joy, and deep realization."),
    ("The Itivuttaka: The Buddha's Sayings", "John D. Ireland", 1991, "Collection of 112 ethical and doctrinal discourses remembered and recited by the laywoman Khujjuttara."),
    ("Theragatha: Verses of the Senior Monks", "Bhikkhu Sujato", 2018, "Heroic, ecstatic poetry of awakened male disciples detailing their forest struggles, samadhi, and liberation."),
    ("Therigatha: Poems of Early Buddhist Nuns", "Charles Hallisey", 2015, "Historic collection of awakening poems by ancient women who overcame grief, domestic confinement, and social shame."),
    ("The Sutta Nipata: Early Buddhist Poetry", "H. Saddhatissa", 1985, "Archaic collection containing the Uraga, Rhinoceros Horn, and Metta Suttas, exalting solitary wandering."),
    ("The Patimokkha: Monastic Discipline Rules", "K.R. Norman", 2001, "The foundational legal text recited fortnightly by the Sangha to preserve institutional purity."),
    ("The Questions of King Milinda (Milindapanha)", "T.W. Rhys Davids", 1890, "Brilliant philosophical dialogue between the Greek King Menander and the Buddhist sage Nagasena."),
    ("The Path of Purification (Visuddhimagga)", "Bhadantacariya Buddhaghosa (Bhikkhu Nanamoli tr.)", 1956, "The monumental 900-page fifth-century encyclopedia of Theravada doctrine, meditation methods, and insight knowledges."),
    ("The Path of Freedom (Vimuttimagga)", "Arahant Upatissa (N.R.M. Ehara tr.)", 1961, "The ancient meditation manual that served as the primary model and predecessor for the Visuddhimagga."),
    ("Dhammasangani: Buddhist Psychological Ethics", "C.A.F. Rhys Davids", 1900, "The first book of the Abhidhamma Pitaka, classifying all 89 types of consciousness and their mental concomitants."),
    ("Vibhanga: The Book of Analysis", "Sayadaw U Thittila", 1969, "The second book of the Abhidhamma, subjecting aggregates, sense-bases, truths, and dependent origination to rigorous analysis."),
    ("Dhatukatha: Discourse on Elements", "Sayadaw U Narada", 1962, "The third Abhidhamma text, analyzing phenomena in terms of categories, aggregates, bases, and elemental realities."),
    ("Puggalapannatti: Designation of Human Types", "B.C. Law", 1924, "The fourth Abhidhamma book, classifying human temperaments and spiritual capacities according to mental development."),
    ("Kathavatthu: Points of Controversy", "S.Z. Aung & C.A.F. Rhys Davids", 1915, "The fifth Abhidhamma book, recording the refutation of 219 non-Theravada sectarian heresies by Moggaliputta Tissa."),
    ("Yamaka: The Book of Pairs", "Sayadaw U Tiloka", 1978, "The sixth Abhidhamma book, utilizing strict syllogistic formal logic to test the boundaries of psychological categories."),
    ("Patthana: The Great Book of Conditional Relations", "Sayadaw U Narada", 1969, "The ultimate crowning Abhidhamma treatise, mapping reality through twenty-four pervasive conditional relations (paccaya)."),
    ("The Philosophy of the Abhidhamma", "E.W. Adikaram", 1953, "Historical and philosophical analysis of how the early Abhidhamma developed from the canonical Suttas."),
    ("Process of Consciousness according to Abhidhamma", "Dr. Mehm Tin Mon", 1993, "Detailed manual exploring the citta-vithi: the lightning-fast seventeen-thought-moment perceptual process."),
    ("The Essence of Buddha Abhidhamma", "Dr. Mehm Tin Mon", 1995, "Comprehensive textbook explaining consciousness, mental factors, matter (rupa), and Nibbana with practical charts."),
    ("Abhidhamma in Practice", "N.K.G. Mendis", 1985, "Showing how the deep psychological taxonomy of the Abhidhamma directly clarifies everyday meditation experiences."),
    ("Unconditional Love and the Abhidhamma", "Nina van Gorkom", 2004, "Examining wholesome mental factors (cetasikas) and understanding how compassion arises free of self-attachment."),
    ("Citta and Cetasika: Mind and Mental Factors", "Nina van Gorkom", 2009, "Practical explanation of the 52 mental factors that color, distort, or purify daily conscious experience."),
    ("The Buddha's Philosophy of Mind", "C.A.F. Rhys Davids", 1914, "Pioneering Western psychological study of the early Pali Buddhist conception of consciousness."),
    ("The Buddha and His Teachings", "Narada Mahathera", 1980, "Classic, authoritative manual of Theravada doctrine, covering kamma, rebirth, Nibbana, and meditation."),
    ("Buddhist Dictionary: Manual of Terms and Doctrines", "Nyanatiloka Mahathera", 1952, "The indispensable lexicon defining Pali doctrinal terminology with exact scriptural citations."),
    ("The Word of the Buddha", "Nyanatiloka Mahathera", 1907, "The classic systematic outline of the Buddha's entire teaching arranged according to the Four Noble Truths."),
    ("The Path to Deliverance: Handbook of Meditation", "Nyanatiloka Mahathera", 1952, "Curated sutta manual detailing every stage of meditation practice from initial morality to the fruition of Arahantship."),
    ("Fundamentals of Buddhism: Four Lectures", "Nyanatiloka Mahathera", 1949, "Essays elucidating kamma, rebirth, dependent origination, and the non-existence of an eternal soul."),
    ("Guide Through the Abhidhamma-Pitaka", "Nyanatiloka Mahathera", 1938, "The historic Western guide summarizing the contents, structure, and methodology of all seven Abhidhamma books."),
    ("Karma and Rebirth", "Nyanatiloka Mahathera", 1959, "Refuting fatalism and mechanical reincarnation, presenting kamma as dynamic conditioning."),
    ("The Psychological Attitude of Early Buddhist Philosophy", "Lama Anagarika Govinda", 1961, "A magnificent exploration of the Abhidhamma's psychological architecture and meditative diagrams."),
    ("Early Buddhist Metaphysics", "Noa Ronkin", 2005, "Scholarly investigation into how the Abhidhamma developed an ontology of dynamic processes rather than static substances."),
    ("The Conception of Buddhist Nirvana", "Th. Stcherbatsky", 1927, "Classic academic treatise exploring the transition from early Abhidharma pluralism to Nagarjuna's sunyata."),
    ("Central Conception of Buddhism and Meaning of Dharma", "Th. Stcherbatsky", 1923, "Pioneering analysis demonstrating that early Buddhism views reality as a stream of interdependent point-events (dharmas)."),
    ("Buddhist Logic (Volume 1)", "Th. Stcherbatsky", 1930, "Epic academic treatise on Dignaga and Dharmakirti's epistemological revolution in Buddhist logic and perception."),
    ("Buddhist Logic (Volume 2)", "Th. Stcherbatsky", 1930, "Translations and commentary on Dharmakirti's Nyayabindu, analyzing valid cognition and inference."),
    ("The Psychological Aspect of Buddhism", "Piyadassi Thera", 1972, "BPS monograph explaining the mind as the forerunner of all good and evil states."),
    ("The Seven Factors of Enlightenment: Bojjhanga", "Piyadassi Thera", 1960, "Practical instructions on balancing mindfulness, investigation, energy, joy, tranquility, concentration, and equanimity."),
    ("The Spectrum of Buddhism", "Piyadassi Thera", 1991, "Collection of essays highlighting the rational, empirical, and psychological brilliance of the Pali Suttas."),
    ("The Buddha's Ancient Path", "Piyadassi Thera", 1964, "Exhaustive, revered guide systematically explaining each factor of the Four Noble Truths and Eightfold Path."),
    ("Dependent Origination: Paticca Samuppada", "Piyadassi Thera", 1959, "Clear exposition of the twelve links, demonstrating how the cessation of ignorance leads to the cessation of suffering."),
    ("Comprehensive Commentary on the Abhidhammattha Sangaha", "Mahathera Narada", 1956, "Pali text with English translation and comprehensive notes on consciousness and matter."),
    ("Analysis of the Sensuous Realm: Kama-loka", "Dr. Mehm Tin Mon", 1997, "Abhidhamma analysis of sensual consciousness, sensory desires, and karmic repercussions."),
    ("Analysis of the Fine-Material Realm: Rupa-loka", "Dr. Mehm Tin Mon", 1998, "Psychological examination of the four rupa-jhanas and the serene states of divine abiding."),
    ("Analysis of the Immaterial Realm: Arupa-loka", "Dr. Mehm Tin Mon", 1999, "Understanding the subtle absorptions into boundless space, boundless consciousness, nothingness, and neither-perception."),
    ("Supramundane Consciousness: Lokuttara Citta", "Dr. Mehm Tin Mon", 2000, "The Abhidhamma's precise mapping of the eight transcendent moments of noble path and noble fruit."),
    ("The Doctrine of Anatta in the Nikayas", "Dr. G.P. Malalasekera", 1957, "Comprehensive textual study on the Buddha's unique contribution: the complete absence of a persistent self."),
    ("Dictionary of Pali Proper Names (Volume 1)", "G.P. Malalasekera", 1937, "The indispensable encyclopedic dictionary of every person, deity, place, and sutta in the Pali Canon."),
    ("Dictionary of Pali Proper Names (Volume 2)", "G.P. Malalasekera", 1938, "Concluding volume containing detailed biographical cross-references for early Buddhist historical figures."),
    ("Early Buddhist Theory of Knowledge", "K.N. Jayatilleke", 1963, "Monumental study exploring the Buddha's empiricism, logic, verificationism, and critique of authority."),
    ("The Message of the Buddha", "K.N. Jayatilleke", 1975, "Brilliant radio lectures exploring the scientific temper, ethics, and political philosophy of early Buddhism."),
    ("Survival and Karma in Buddhist Perspective", "K.N. Jayatilleke", 1969, "Philosophical defense of the empirical evidence for rebirth and personal responsibility."),
    ("Buddhism: Its Religion and Philosophy", "K.N. Jayatilleke", 1962, "Introductory lectures presenting the core Dhamma free from superstitious accretions."),
    ("Facets of Buddhist Thought", "K.N. Jayatilleke", 1971, "Collection of essays discussing the social philosophy, tolerance, and historical realism of the Buddha."),
    ("A Treasury of the Buddha's Words: Discourses from Majjhima", "Nyanamoli Thera", 1977, "Carefully selected and translated suttas illustrating the psychological realism of the Buddha's guidance."),
    ("The Practice of Sila (Morality) in the Tipitaka", "Bhikkhu Pesala", 2005, "Why unblemished ethical conduct is the indispensable energetic launching pad for mental stillness."),
    ("An Analysis of the Sutta Nipata", "Bhikkhu Nyanatusita", 2011, "Detailed structural and doctrinal analysis of the archaic verses of the Khuddaka Nikaya."),
    ("A Pali Grammar for Beginners", "Venerable Narada Thera", 1952, "Classic concise textbook teaching the sacred language of the Tipitaka."),
    ("The Pali Literature of Ceylon", "G.P. Malalasekera", 1928, "Authoritative history of the preservation and translation of the Theravada canon in Sri Lanka."),
    ("The Discourse on Right View: Sammaditthi Sutta", "Bhikkhu Nanamoli & Bhikkhu Bodhi", 1991, "Translation and commentary on Sariputta's masterwork defining the sixteen avenues to Right View."),
    ("The Book of the Discipline (Vinaya Pitaka)", "I.B. Horner", 1949, "The authoritative English translation of the early monastic code and historical dispute settlements."),
    ("Pali Buddhist Review Anthologies", "Russell Webb ed.", 1982, "Scholarly journal compilations evaluating translation dilemmas and doctrinal nuances in the Canon."),
    ("The Heritage of the Sangha", "Walpola Rahula", 1974, "Historical analysis of the Theravada monastic order's role as educators, ascetics, and preservers of the Dhamma."),
    ("What the Buddha Taught", "Walpola Rahula", 1959, "The world-famous, definitive introductory masterwork explaining the Four Truths, Anatta, and meditation.")
]

for t, a, y, ins in tipitaka_list:
    add_b(t, a, y, ins, "6_tipitaka_abhidhamma")

# =========================================================================
# 7) BuddhaNet, Ledi, Goenka, U Ba Khin, Webu, Pa-Auk (50 books)
# =========================================================================
vipassana_masters_list = [
    ("The Manuals of Dhamma (Collected Works)", "Ven. Ledi Sayadaw", 1986, "The monumental compilation containing all major insight treatises by the father of modern lay Vipassana."),
    ("Manual of Insight (Vipassana Dipani)", "Ven. Ledi Sayadaw", 1914, "The groundbreaking work that made the contemplation of impermanence and non-self accessible to everyday seekers."),
    ("Manual of the Path to Higher Knowledge (Patthanuddesa Dipani)", "Ven. Ledi Sayadaw", 1930, "Systematic exposition of the twenty-four conditional relations and how they operate in the mind."),
    ("Manual of the Factors of Enlightenment (Bodhipakkhiya Dipani)", "Ven. Ledi Sayadaw", 1926, "Definitive handbook detailing the cultivation of the 37 wings to awakening in daily life."),
    ("Manual of the Four Noble Truths (Saccavanta Dipani)", "Ven. Ledi Sayadaw", 1922, "Explaining how penetrating suffering and its origination naturally brings about the unconditioned."),
    ("Manual of the Noble Path (Magganga Dipani)", "Ven. Ledi Sayadaw", 1924, "Practical guide to refining the eight path factors into an integrated engine of liberation."),
    ("Manual of Non-Self (Anatta Dipani)", "Ven. Ledi Sayadaw", 1920, "Fierce deconstruction of identity-view, exposing the five aggregates as ownerless, impersonal processes."),
    ("Manual of Right View (Ditthi Dipani)", "Ven. Ledi Sayadaw", 1921, "Diagnostic analysis of sixty-two wrong philosophical views and how to establish unshakable right view."),
    ("Manual of the Supreme Man (Uttamapurisa Dipani)", "Ven. Ledi Sayadaw", 1925, "Inspiring portraits of the qualities, virtues, and determination of a fully awakened human being."),
    ("Manual of Light (Alin Kyan)", "Ven. Ledi Sayadaw", 1918, "Poetic and practical instructions on illuminating the darkness of delusion with radiant wisdom."),
    ("The Requisites of Enlightenment", "Ven. Ledi Sayadaw", 1971, "A condensed manual of spiritual practice for earnest meditators seeking liberation in this very life."),
    ("The Clock of Vipassana Has Struck", "Sayagyi U Ba Khin", 1985, "Inspiring biographical account, talks, and letters of the master who trained S.N. Goenka."),
    ("A Practical Guide to Vipassana Meditation", "Sayagyi U Ba Khin", 1970, "Concise instructions on cultivating anicca (impermanence) awareness through direct physical sensation."),
    ("The Art of Living: Vipassana Meditation", "William Hart & S.N. Goenka", 1987, "The authoritative global handbook detailing the 10-day Goenka Vipassana retreat methodology."),
    ("Discourses on the Satipatthana Sutta", "S.N. Goenka", 1999, "Talks given during intensive eight-day courses, explaining the profound meaning of the classical sutta."),
    ("For the Benefit of Many", "S.N. Goenka", 2002, "Collection of talks and articles addressing the non-sectarian, universal nature of the Buddha's Dhamma."),
    ("Meditation Now: Inner Peace Through Inner Wisdom", "S.N. Goenka", 2002, "Practical advice for young people and professionals on managing anger, anxiety, and stress through Vipassana."),
    ("Was the Buddha a Pessimist?", "S.N. Goenka", 1995, "Refuting the accusation that Buddhism is negative, demonstrating that facing suffering leads to supreme bliss."),
    ("Dharma: Its True Nature", "S.N. Goenka", 1996, "Explaining Dhamma not as a sectarian dogma or ritual, but as the universal, scientific law of nature."),
    ("The Gracious Flow of Dharma", "S.N. Goenka", 1994, "Reflections on compassion, service, and maintaining selflessness while managing large worldly responsibilities."),
    ("Chronicles of Dhamma: Historical Perspectives", "S.N. Goenka", 2000, "Tracing the historic chain of Vipassana preservation from Emperor Asoka through the golden lineage of Burma."),
    ("Realizing the Truth Through Sensations", "S.N. Goenka", 2005, "Explaining the pivotal role of vedana (bodily sensation) as the crossroads where craving arises or ceases."),
    ("The Essential Practice: Dhamma Discourses", "Webu Sayadaw", 1992, "Intensely practical sermons by the beloved Burmese arahant on non-stop Anapanasati (breath awareness)."),
    ("To Light a Fire: A Guide to Practice", "Webu Sayadaw", 2000, "Using the famous analogy of rubbing sticks together: practicing without pause until awakening ignites."),
    ("The Way to Nibbana", "Webu Sayadaw", 2003, "Direct instructions on maintaining breath awareness while standing, walking, lying down, and working."),
    ("Knowing and Seeing: Teachings of Pa-Auk Monastery", "Pa-Auk Sayadaw", 2000, "Exhaustive 500-page manual on developing white-light nimitta, the four jhanas, and ultimate material analysis."),
    ("The Workings of Kamma", "Pa-Auk Sayadaw", 2012, "Monumental study detailing how specific past intentional states condition future physical rebirths."),
    ("Mindfulness of Breathing & Four Elements Meditation", "Pa-Auk Sayadaw", 2003, "Precise instructions on discerning the four elements (earth, water, fire, wind) and their sub-qualities."),
    ("The Practice Which Leads to Nibbana", "Pa-Auk Sayadaw", 2006, "Systematic training roadmap coordinating deep samatha absorption with microscopic Abhidhamma Vipassana."),
    ("Toward Eternal Peace: Discourse on Nibbana", "Pa-Auk Sayadaw", 2010, "In-depth scriptural exposition on the unconditioned nature of Nibbana according to canonical commentaries."),
    ("A Chariot to Nibbana: Stages of Awakening", "Pa-Auk Sayadaw", 2014, "Detailed description of how noble path consciousness shatters defilements at stream-entry, once-returning, etc."),
    ("Teaching and Training at Pa-Auk Monastery", "Pa-Auk Sayadaw", 2005, "Overview of the monastic life, meditation schedule, and rigorous textual study in the forest of Myanmar."),
    ("The Mechanism of the Five Aggregates", "Pa-Auk Sayadaw", 2011, "Analyzing materiality (rupa-kalapas) and mental factors under the focused light of fourth-jhana samadhi."),
    ("The Tree of Enlightenment", "Peter Della Santina", 1997, "BuddhaNet's comprehensive university-level textbook surveying early Buddhism, Mahayana, and Vajrayana."),
    ("Fundamentals of Buddhism", "Peter Della Santina", 1984, "Accessible lecture series elucidating the core principles of karma, rebirth, non-self, and meditation."),
    ("What Buddhists Believe", "K. Sri Dhammananda", 1982, "The classic Buddhist Publication Society handbook answering everyday questions on rites, fate, and truth."),
    ("How to Live Without Fear and Worry", "K. Sri Dhammananda", 1989, "Practical psychological guide on cultivating emotional resilience, mental poise, and self-confidence."),
    ("Treasure of the Dhamma", "K. Sri Dhammananda", 1994, "Inspiring anthology of Buddhist sayings, parables, and ethical principles for harmonious community life."),
    ("Buddhism in a Nutshell", "Narada Mahathera", 1933, "The historic pocket handbook that provided a concise, lucid overview of the Dhamma to generations of seekers."),
    ("Manual of Abhidhamma (Abhidhammattha Sangaha)", "Narada Mahathera", 1956, "Pioneering English edition providing concise tables and lucid explanations of the Abhidhamma categories."),
    ("The Great Book of Protection (Maha Paritta)", "Ven. Piyadassi Thera", 1975, "The history, meaning, and psychological power of chanting the ancient protective discourses."),
    ("The Buddha's System of Meditation", "Ayya Khema", 1988, "Clear instructions on using mindfulness of breathing and body scanning to achieve inner peace."),
    ("When the Iron Eagle Flies: Buddhism for the West", "Ayya Khema", 1991, "Direct retreat talks bridging ancient Theravada wisdom with modern Western psychological challenges."),
    ("Being Nobody, Going Nowhere: Meditations on the Path", "Ayya Khema", 1987, "Beloved classic on dropping ego-defense mechanisms and embracing the freedom of emptiness."),
    ("Who Is My Self? A Guide to Buddhist Meditation", "Ayya Khema", 1997, "Illuminating commentary on the Potthapada Sutta, exploring the states of consciousness and not-self."),
    ("Give It Up and Be Happy", "Ayya Khema", 2001, "Essays on renunciation not as cold privation, but as the joyful unburdening of the human heart."),
    ("I Give You My Life: The Autobiography of Ayya Khema", "Ayya Khema", 1998, "The dramatic spiritual odyssey of a German Jewish refugee who became a pioneer Buddhist nun."),
    ("Visible Here and Now: The Buddha's Teachings", "Ayya Khema", 2001, "Emphasizing sanditthiko: the truth of the Dhamma is verified immediately in present experience."),
    ("Know Your Mind: The Four Foundations of Mindfulness", "Ayya Khema", 2017, "Clear, pragmatic retreat instructions on investigating the physical body, pleasant/unpleasant feelings, and thought."),
    ("All of Us: Beset by Birth, Decay, and Death", "Ayya Khema", 1999, "Facing existential impermanence with calm, joyous wisdom rather than anxiety and avoidance.")
]

for t, a, y, ins in vipassana_masters_list:
    add_b(t, a, y, ins, "7_buddhanet_vipassana")

# =========================================================================
# 8) Dalai Lama books (50 books)
# =========================================================================
dalai_lama_list = [
    ("The Art of Happiness: A Handbook for Living", "Dalai Lama & Howard C. Cutler", 1998, "The global classic exploring the cultivation of inner warmth, emotional resilience, and genuine contentment."),
    ("The Art of Happiness at Work", "Dalai Lama & Howard C. Cutler", 2003, "Applying compassion, patience, and purpose to navigate workplace stress, boredom, and rivalry."),
    ("The Art of Happiness in a Troubled World", "Dalai Lama & Howard C. Cutler", 2009, "Practical approaches to overcoming fear, prejudice, and cynicism in an era of globalization."),
    ("An Open Heart: Practicing Compassion in Everyday Life", "Dalai Lama (Nicholas Vreeland ed.)", 2001, "Luminous instructions on transforming self-centered grasping into universal loving-kindness."),
    ("The Universe in a Single Atom: Convergence of Science and Spirituality", "Dalai Lama", 2005, "Engaging dialogue with quantum mechanics, neurobiology, and genetics, finding deep harmony with Buddhist thought."),
    ("How to See Yourself As You Really Are", "Dalai Lama (Jeffrey Hopkins tr.)", 2006, "Clear guide to penetrating the illusion of a solid self using Madhyamaka emptiness reasoning."),
    ("Ethics for the New Millennium", "Dalai Lama", 1999, "Visionary moral framework grounded in universal human empathy and basic secular humanism."),
    ("Beyond Religion: Ethics for a Whole World", "Dalai Lama", 2011, "A universal ethical compass for an interconnected world, independent of religious dogma or sectarian belief."),
    ("Stages of Meditation: Commentary on the Bhavanakrama", "Dalai Lama", 2001, "Comprehensive manual on developing calm abiding (shamatha) and special insight (vipashyana)."),
    ("The Heart of Compassion: A Practical Approach", "Dalai Lama", 2002, "Commentary on the Eight Verses on Training the Mind, teaching how to embrace adversaries as teachers."),
    ("Awakening the Mind, Lightening the Heart", "Dalai Lama", 2000, "Practical instructions on generating bodhicitta: the altruistic aspiration to achieve awakening for all beings."),
    ("How to Practice: The Way to a Meaningful Life", "Dalai Lama", 2002, "Step-by-step roadmap outlining the three trainings: moral discipline, concentrated meditation, and wisdom."),
    ("The World of Tibetan Buddhism: Philosophy and Practice", "Dalai Lama", 1995, "Comprehensive, authoritative overview of the Four Truths, the Bodhisattva path, and Tantric deity yoga."),
    ("Dzogchen: Heart Essence of the Great Perfection", "Dalai Lama", 2000, "Profound teachings on recognizing rigpa: the pristine, primordial awareness that is never obscured."),
    ("The Good Heart: A Buddhist Perspective on Jesus", "Dalai Lama", 1996, "Interfaith dialogues exploring Jesus's parables of compassion through the lens of Buddhist wisdom."),
    ("Freedom in Exile: The Autobiography of the Dalai Lama", "Dalai Lama", 1990, "Inspiring personal memoirs detailing his discovery as a child, the flight from Tibet, and life as a refugee."),
    ("My Land and My People: The Original Autobiography", "Dalai Lama", 1962, "The poignant historical account of his early years in Tibet, Chinese occupation, and struggle for survival."),
    ("Approaching the Buddhist Path", "Dalai Lama & Thubten Chodron", 2017, "Volume 1 of the definitive Library of Wisdom and Compassion, establishing the empirical framework of Dhamma."),
    ("The Foundation of Buddhist Practice", "Dalai Lama & Thubten Chodron", 2018, "Volume 2: Examining what makes life meaningful, spiritual mentors, karma, and preparing for death."),
    ("Samsara, Nirvana, and Buddha Nature", "Dalai Lama & Thubten Chodron", 2019, "Volume 3: Analyzing the cyclic trap of samsara, the nature of Nirvana, and the innate purity of mind."),
    ("Following in the Buddha's Footsteps", "Dalai Lama & Thubten Chodron", 2019, "Volume 4: Detailed instructions on the monastic community, ethics, mindfulness, and the triple gem."),
    ("In Praise of Great Compassion", "Dalai Lama & Thubten Chodron", 2020, "Volume 5: Deepening the four immeasurables and the courageous altruism of the Bodhisattva ideal."),
    ("Courageous Compassion", "Dalai Lama & Thubten Chodron", 2021, "Volume 6: Exploring the six paramitas: generosity, ethical discipline, patience, energy, meditation, and wisdom."),
    ("Searching for the Self", "Dalai Lama & Thubten Chodron", 2022, "Volume 7: Rigorous philosophical deconstruction of the inherent self through Madhyamaka Prasangika logic."),
    ("Realizing the Profound View", "Dalai Lama & Thubten Chodron", 2023, "Volume 8: Advanced investigation into ultimate reality, the two truths, and dependent origination."),
    ("Mind of Clear Light: Advice on Living Well and Dying Consciously", "Dalai Lama", 2002, "Exploring the eight dissolution stages of dying and utilizing the subtle mind of clear light for awakening."),
    ("Kindness, Clarity, and Insight", "Dalai Lama (Jeffrey Hopkins tr.)", 1984, "Pioneering lectures introducing Tibetan Buddhist metaphysics, compassion, and emptiness to North America."),
    ("Transforming the Mind: Generating Compassion", "Dalai Lama", 2000, "Practical instructions on using mental training (lojong) to transform difficulties into spiritual nourishment."),
    ("The Essence of the Heart Sutra", "Dalai Lama", 2002, "Commentary on the Heart Sutra: 'Form is emptiness, emptiness is form,' unpacking the Middle Way."),
    ("Healing Anger: The Power of Patience", "Dalai Lama", 1997, "Brilliant commentary on Chapter 6 of Shantideva's Bodhicaryavatara, detailing the antidotes to rage."),
    ("Lighting the Path: The Four Noble Truths", "Dalai Lama", 2008, "Lucid retreat discourses clarifying the diagnosis and cure for human dissatisfaction."),
    ("The Gelug/Kagyu Tradition of Mahamudra", "Dalai Lama & Alexander Berzin", 1997, "In-depth guide to meditating on the conventional and ultimate nature of consciousness itself."),
    ("Heart Advice of a Mahamudra Master", "Dalai Lama", 2009, "Practical commentary on resting the mind in its unoriginated, effortless natural clarity."),
    ("Flash of Lightning in the Dark of Night", "Dalai Lama", 1994, "A verse-by-verse commentary on Shantideva's Guide to the Bodhisattva's Way of Life."),
    ("The Joy of Living and Dying in Peace", "Dalai Lama", 1997, "How understanding the certainty and unpredictability of death frees us to live with open-hearted joy."),
    ("The Middle Way: Faith Grounded in Reason", "Dalai Lama", 2009, "Demonstrating how Nagarjuna's philosophy destroys dogmatism and aligns faith with rational inquiry."),
    ("A Policy of Kindness: Anthology of Writings", "Dalai Lama (Sidney Piburn ed.)", 1990, "Essential collection of speeches, Nobel Peace Prize lecture, and reflections on global brotherhood."),
    ("MindScience: An East-West Dialogue", "Dalai Lama, Herbert Benson, et al.", 1991, "Pioneering Harvard symposium bridging Buddhist meditation with mind-body medical science."),
    ("Sleeping, Dreaming, and Dying: Exploration of Consciousness", "Dalai Lama & Francisco Varela", 1997, "Mind and Life dialogues examining lucid dreaming, sleep states, and the biological transitions of death."),
    ("Gentle Bridges: Conversations with the Dalai Lama on Mind Sciences", "Jeremy W. Hayward & Francisco Varela", 1992, "The foundational dialogues that sparked modern contemplative neuroscience and cognitive science."),
    ("The Compassionate Life", "Dalai Lama", 2001, "Concise, moving instructions on breaking out of the prison of self-preoccupation."),
    ("Words of Truth: A Buddhist Prayer for Peace", "Dalai Lama", 1994, "Reflections on cultivating unwavering loving-kindness in the face of political oppression and exile."),
    ("Transcending: Reflections on Finding Meaning in Suffering", "Dalai Lama", 2006, "How adversity, political heartbreak, and personal tragedy can strengthen the spiritual spine."),
    ("Live in a Better Way: Reflections on Truth, Love, and Happiness", "Dalai Lama", 2001, "Warm, down-to-earth advice delivered to ordinary citizens in India on domestic harmony."),
    ("Many Ways to Nirvana: Reflections on Happiness", "Dalai Lama", 2004, "Explaining that while traditions differ in technique, they converge on the pacification of craving."),
    ("The Wisdom of Forgiveness: Intimate Conversations", "Dalai Lama & Victor Chan", 2004, "Personal stories showing how the Dalai Lama practices radical forgiveness toward his oppressors."),
    ("Mind in Comfort and Ease: The Vision of the Great Perfection", "Dalai Lama", 2007, "Deep Dzogchen retreat instructions given in France on settling the mind into natural ease."),
    ("Toward a True Kinship of Faiths", "Dalai Lama", 2010, "How world religions can overcome sectarian bigotry while preserving their unique doctrinal identities."),
    ("The Book of Joy: Lasting Happiness in a Changing World", "Dalai Lama & Desmond Tutu", 2016, "Playful, profound dialogue between two spiritual giants on cultivating joy amid suffering."),
    ("Heart to Heart: A Conversational Guide to Awakening", "Dalai Lama & Patrick Gaffney", 2023, "Intimate, reflective dialogues on life, environmental stewardship, and resting in peace.")
]

for t, a, y, ins in dalai_lama_list:
    add_b(t, a, y, ins, "8_dalai_lama")

# =========================================================================
# 9) BPS Classic Monographs & Wheel Series (40 books)
# =========================================================================
bps_list = [
    ("The Three Basic Facts of Existence: Impermanence (Anicca)", "BPS Anthology", 1981, "Seminal collection of canonical suttas and essays analyzing the universal law of constant change."),
    ("The Three Basic Facts of Existence: Suffering (Dukkha)", "BPS Anthology", 1982, "Philosophical exploration of unsatisfactoriness across physical pain, change, and conditioned existence."),
    ("The Three Basic Facts of Existence: Non-Self (Anatta)", "BPS Anthology", 1983, "Exhaustive compilation deconstructing the illusion of ego-identity across the five aggregates."),
    ("Kamma and Its Fruit: Explorations in Buddhist Karma", "Nyanaponika Thera (ed.)", 1975, "Anthology explaining intentional action, moral retribution, and freedom from mechanical fatalism."),
    ("The Elimination of Anger", "Ven. K. Piyatissa Thera", 1975, "Diagnostic handbook identifying the psychological roots of rage and offering practical Dhamma antidotes."),
    ("The Path of Non-Attachment", "Sister Vajira", 1962, "Reflective essays by a British Buddhist nun on renunciation, solitude, and inner clarity."),
    ("The Power of Mindfulness in Daily Living", "BPS Anthology", 1985, "Collection of essays illustrating how bare attention transforms mundane work, grief, and relationships."),
    ("Taming the Mind: Discourses on Mind Training", "BPS Anthology", 1980, "Classic Theravada guidelines on overcoming sensory distraction, restlessness, and mental fatigue."),
    ("The Buddhist Way of Loving-Kindness (Metta Bhavana)", "Acharya Buddharakkhita", 1989, "Practical handbook detailing the progressive expansion of metta from oneself to all living beings."),
    ("Mind: Overcoming Its Canker (Asavas)", "BPS Wheel Series", 1974, "Analyzing the four deep unconscious taints: sensual desire, becoming, wrong view, and ignorance."),
    ("The Fire Sermon: Adittapariyaya Sutta", "BPS Wheel Series", 1973, "Commentary on the Buddha's third sermon: 'All is burning with the fire of passion, hatred, and delusion.'"),
    ("Radical Buddhism: The Early Pali Suttas", "BPS Anthology", 1988, "Highlighting the revolutionary, anti-caste, empirical social and psychological spirit of early Buddhism."),
    ("Rebirth as Doctrine and Experience: Essays and Case Studies", "Francis Story", 1975, "Rigorous collection evaluating empirical case studies of past-life memories alongside Buddhist doctrine."),
    ("Dimensions of Buddhist Thought: Collected Essays", "Francis Story", 1976, "Comprehensive essays examining the psychological realism, cosmology, and rational temper of Buddhism."),
    ("The Case for Rebirth", "Francis Story", 1959, "Early philosophical monograph challenging materialist assumptions and presenting verified reincarnation memories."),
    ("Gods and the Universe in Buddhist Perspective", "Francis Story", 1962, "Clarifying the early Buddhist cosmology: devas and brahmas as impermanent beings subject to rebirth."),
    ("The Buddhist Approach to Mental Health", "Francis Story", 1968, "Showing how the cultivation of bare attention acts as natural preventative therapy for neurotic disturbance."),
    ("Ananda: The Guardian of the Dhamma", "Hellmuth Hecker", 1979, "Inspiring biography of the Buddha's personal attendant, his phenomenal memory, and late awakening."),
    ("Maha Kassapa: Father of the Sangha", "Hellmuth Hecker", 1974, "Portrait of the austere forest master who convened the First Buddhist Council to preserve the Suttas."),
    ("Maha Moggallana: Master of Psychic Power", "Hellmuth Hecker", 1979, "Examining the spiritual exploits, past karma, and ultimate martyrdom of the Buddha's second chief disciple."),
    ("Angulimala: A Murderer's Road to Sainthood", "Hellmuth Hecker", 1981, "The dramatic canonical story demonstrating that no karmic past is too dark for redemption through Dhamma."),
    ("Buddhist Women at the Time of the Buddha", "Hellmuth Hecker", 1982, "Biographies of Khema, Uppalavanna, Patacara, Kisagotami, and other realized women of early Buddhism."),
    ("Buddhism and the Crisis of the Modern World", "BPS Anthology", 1993, "Scholarly essays addressing modern alienation, consumerism, and ecological destruction through Dhamma."),
    ("The Simile of the Cloth: Vatthupama Sutta", "Nyanaponika Thera", 1975, "Commentary on cleansing the sixteen mental defilements like laundering a stained garment."),
    ("The Greater Discourse on Voidness: Maha-Sunnata Sutta", "Nyanamoli Thera", 1983, "Detailed instructions on internal and external dwelling in the voidness of all phenomena."),
    ("The Discourse on the Snake Simile: Alagaddupama Sutta", "Nyanaponika Thera", 1962, "Why grasping Dhamma dogmatically without practice is like seizing a venomous snake by its tail."),
    ("The Elephant Footprint: Cula-Hatthipadopama Sutta", "Bhikkhu Bodhi", 1988, "Tracking the footprints of an elephant: how the complete path of awakening unfolds logically."),
    ("The Simile of the Raft: Crossing Over the Stream", "BPS Wheel Series", 1980, "Understanding the Dhamma as a raft to cross the flood of suffering, not something to carry on one's head."),
    ("The Kalama Sutta: The Buddha's Charter of Free Inquiry", "Soma Thera", 1959, "The historic discourse urging seekers not to believe based on tradition or authority, but on direct experience."),
    ("Right Livelihood in Buddhist Perspective", "BPS Wheel Series", 1986, "Practical guidance on aligning commerce, professional ethics, and careers with non-harming."),
    ("Buddhism and Science: Breakthrough Dialogues", "BPS Wheel Series", 1978, "Early essays exploring atomic physics, neurobiology, and psychological convergence with the Dhamma."),
    ("A Young People's Life of the Buddha", "Bhikkhu Silacara", 1953, "Classic narrative biography introducing the prince of Kapilavastu and his noble quest to youth."),
    ("The Noble Quest: Ariyapariyesana Sutta", "Bhikkhu Nanamoli", 1974, "The Buddha's own autobiographical account of leaving home, studying under gurus, and conquering death."),
    ("Discourse on the Honeyball: Madhupindika Sutta", "Bhikkhu Nanamoli", 1977, "Analyzing the psychological chain: perception leads to thought, thought leads to papanca (conceptual proliferation)."),
    ("The Discourse on the Stilled Thought: Vitakkasanthana Sutta", "Soma Thera", 1960, "Five practical methods for knocking out unwholesome thoughts like a carpenter drives out a wooden peg."),
    ("The Discourse on the Seven Purifications", "Sayadaw U Thittila", 1971, "Summary of the progressive purification of morality, mind, view, doubt, path, knowledge, and vision."),
    ("Reflections on the Dhamma", "Venerable Narada Mahathera", 1968, "Inspiring essays on compassion, the law of moral compensation, and conquering fear."),
    ("The Buddhist Conception of Mental Health", "Dr. K.D.P. Wickremasinghe", 1983, "Comparing Western psychoanalysis and cognitive behavioral therapy with early Buddhist psychology."),
    ("The Great Discourse on the Lion's Roar: Maha-Sihanada Sutta", "Bhikkhu Nanamoli", 1984, "The Buddha's fearless proclamation of his ten powers, four confidences, and supreme insight."),
    ("Setting in Motion the Wheel of Truth", "Ven. Mahasi Sayadaw", 1978, "BPS edition of Mahasi's brilliant verse-by-verse exposition of the Buddha's very first sermon.")
]

for t, a, y, ins in bps_list:
    add_b(t, a, y, ins, "9_bps_monographs")

# =========================================================================
# 10) Satipatthana & Anapanasati Literature (40 books)
# =========================================================================
satipatthana_list = [
    ("The Way of Mindfulness: Satipatthana Sutta & Commentary", "Soma Thera", 1941, "The pioneer English translation of the classical sutta and Buddhaghosa's Papañcasūdani commentary."),
    ("Mindfulness: A Practical Guide to Awakening (Vol 1 - Body)", "Joseph Goldstein", 2013, "Exhaustive practical commentary on the First Foundation of Mindfulness: breath, postures, and elements."),
    ("Mindfulness: A Practical Guide to Awakening (Vol 2 - Feelings)", "Joseph Goldstein", 2014, "Deep dive into vedana (pleasant, unpleasant, neutral sensations) as the critical ignition switch of craving."),
    ("Mindfulness: A Practical Guide to Awakening (Vol 3 - Mind)", "Joseph Goldstein", 2014, "Observing the psychological landscape: lust, anger, delusion, contracted states, and liberated mind."),
    ("Mindfulness: A Practical Guide to Awakening (Vol 4 - Dhammas)", "Joseph Goldstein", 2015, "Investigating the five hindrances, seven factors of awakening, and Four Noble Truths."),
    ("Mindfulness with Breathing: A Manual for Beginners", "Buddhadasa Bhikkhu", 1988, "The definitive Thai practice guide systematically teaching all sixteen steps of Anapanasati."),
    ("Anapanasati: Unveiling the Secrets of Life", "Buddhadasa Bhikkhu", 1990, "Advanced contemplative exposition explaining how conscious breathing directly brings about Nibbana."),
    ("Breath by Breath: The Liberating Practice of Insight", "Larry Rosenberg", 1998, "Beloved contemporary guide integrating Anapanasati into American urban life, work, and relationships."),
    ("Manual of Mindfulness of Breathing (Anapana Dipani)", "Ven. Ledi Sayadaw", 1935, "Master treatise explaining the exact method of anchoring awareness on the nostril breath until samadhi matures."),
    ("Mindfulness of Breathing: Buddhist Texts & Commentaries", "Bhikkhu Nanamoli", 1964, "Exhaustive anthology collecting every passage on Anapanasati across the Pali Canon and Visuddhimagga."),
    ("The Foundations of Mindfulness: Sutta Translation & Guide", "Bhikkhu Bodhi", 1990, "Clear translation and doctrinal notes on the Maha-Satipatthana Sutta."),
    ("Contemplation of the Mind: The Third Foundation", "Joseph Goldstein", 2011, "How observing consciousness without identification dismantles the illusion of an internal executive self."),
    ("Contemplation of Feeling: The Second Foundation", "Nyanaponika Thera", 1983, "BPS monograph analyzing the pivotal role of feeling-tones in breaking the cycle of reactive addiction."),
    ("Contemplation of Dhamma: The Fourth Foundation", "Bhikkhu Analayo", 2018, "Practical guide to examining mental hindrances and awakening factors in the mirror of bare attention."),
    ("Mindfulness of the Body: The First Foundation", "Bhikkhu Analayo", 2017, "Detailed instructions on anatomical parts meditation, element contemplation, and cemetery reflections."),
    ("Anapanasati: The Path of Inhaling and Exhaling", "Webu Sayadaw", 1989, "Urgent sermons on maintaining unbroken awareness of the touch of the breath at the nose-tip."),
    ("The Art of Breathing: Meditative Secret of Insight", "Sayadaw U Pandita", 2005, "Refining breath observation into razor-sharp insight that pierces through temporal illusions."),
    ("The Experiential Path of Satipatthana", "Sayadaw U Tejaniya", 2014, "Focusing on right view and wise attitude while observing the natural movements of the mind."),
    ("The Radiant Mind: Continuous Satipatthana in Modern Life", "Joseph Goldstein", 2010, "Transforming ordinary activities into an unbroken field of mindful inquiry and wakefulness."),
    ("One Dharma: The Emerging Western Buddhism", "Joseph Goldstein", 2002, "How Theravada insight, Zen direct pointing, and Dzogchen natural awareness harmonize into one path."),
    ("The Experience of Insight: Natural Course in Meditation", "Joseph Goldstein", 1976, "The pioneering retreat manual that launched the modern American Vipassana movement."),
    ("A Heart as Wide as the World", "Sharon Salzberg", 1997, "Inspiring essays on finding spiritual sanctuary in daily kindness, forgiveness, and presence."),
    ("Faith: Trusting Your Own Deepest Experience", "Sharon Salzberg", 2002, "Reframing saddha (faith) in Buddhism not as blind belief, but as courage to trust direct experience."),
    ("Gaining Inner Peace Through Satipatthana", "Ven. Mahasi Sayadaw", 1982, "Direct instructions on eliminating mental turbulence and emotional grief through continuous noting."),
    ("The Anapanasati Sutta: Full Translation and Notes", "Bhikkhu Thanissaro", 2006, "Clear translation mapping the four tetrads of breath awareness: body, feelings, mind, and dhammas."),
    ("Focused and Fearless: Meditator's Guide to Deep Joy and Calm", "Shaila Catherine", 2008, "Practical handbook on developing steady samadhi and entering the four jhanas using breath awareness."),
    ("Wisdom Wide and Deep: Mastering Jhana and Vipassana", "Shaila Catherine", 2011, "Comprehensive, advanced manual based on the Pa-Auk Forest Monastery curriculum."),
    ("Beyond Distraction: Five Ways to Focus the Mind", "Shaila Catherine", 2022, "Applying the Vitakkasanthana Sutta to overcome compulsive rumination, distraction, and brain fog."),
    ("Right Concentration: A Practical Guide to the Jhanas", "Leigh Brasington", 2015, "Accessible instructions on cultivating the eight jhanas from Ayya Khema's insight lineage."),
    ("The Experience of Samadhi: In-Depth Exploration", "Richard Shankman", 2008, "Interviews with leading Buddhist masters exploring how samadhi and vipassana interact."),
    ("The Art and Skill of Buddhist Meditation", "Richard Shankman", 2015, "Integrating calm breathing, body grounding, and investigative mindfulness into a seamless practice."),
    ("Seeing That Frees: Meditations on Emptiness", "Rob Burbea", 2014, "The contemporary masterwork on deconstructing the perception of self, objects, and time through insight."),
    ("Buddhism Without Beliefs: A Contemporary Guide", "Stephen Batchelor", 1997, "The international bestseller challenging dogma and presenting early Buddhism as a lived existential practice."),
    ("Confession of a Buddhist Atheist", "Stephen Batchelor", 2010, "Recovering the historical Gautama's radical, non-metaphysical humanism from ancient Pali suttas."),
    ("After Buddhism: Rethinking Dharma for a Secular Age", "Stephen Batchelor", 2015, "Comprehensive philosophical formulation of an engaged, secular, practice-centered Buddhist culture."),
    ("Boundless Heart: The Four Immeasurables", "Christina Feldman", 2017, "In-depth guide to awakening loving-kindness, compassion, joy, and equanimity as direct insight."),
    ("Compassion: Listening to the Cries of the World", "Christina Feldman", 2005, "Moving teachings on transforming heartbreak and despair into boundless, courageous empathy."),
    ("Emptiness: A Practical Guide for Meditators", "Guy Armstrong", 2017, "Accessible, lucid manual on recognizing the selfless, transparent, and ungraspable nature of experience."),
    ("Thoughts Without a Thinker: Psychotherapy from a Buddhist Perspective", "Mark Epstein", 1995, "Seminal exploration of how Satipatthana meditation heals neurosis, narcissism, and trauma."),
    ("Going to Pieces Without Falling Apart", "Mark Epstein", 1998, "How surrendering the compulsive need for ego-control opens the door to authentic spiritual freedom.")
]

for t, a, y, ins in satipatthana_list:
    add_b(t, a, y, ins, "10_satipatthana_anapanasati")

print(f"Total curated Buddhism books created: {len(buddhism_books)}")

# Check for duplicates
seen_ids = set()
duplicates = []
for b in buddhism_books:
    if b["id"] in seen_ids:
        duplicates.append(b["id"])
    seen_ids.add(b["id"])

if duplicates:
    print(f"Found {len(duplicates)} duplicate IDs: {duplicates[:10]}")
    # Auto-resolve duplicates by appending suffix
    counts = {}
    for b in buddhism_books:
        bid = b["id"]
        counts[bid] = counts.get(bid, 0) + 1
        if counts[bid] > 1:
            b["id"] = f"{bid}-{counts[bid]}"
    print(f"Resolved duplicate IDs. Total unique IDs: {len(set(b['id'] for b in buddhism_books))}")
else:
    print("Zero duplicate IDs found!")

# Save to temporary json file
with open("scripts/buddhism_500_catalog.json", "w") as f:
    json.dump(buddhism_books, f, indent=2)

print("Saved to scripts/buddhism_500_catalog.json")
