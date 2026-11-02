import { Book, StashBoard, IdeaCard } from '../types';

export const BOOK_LOADER_MAP: Record<string, string> = {
  "10-days-to-faster-reading": "./books/10DaysToFasterReadingExpanded.ts",
  "168-hours-you-have-more-time-than-you-think": "./books/168HoursYouHaveMoreTimeThanYouThinkExpanded.ts",
  "3-d-negotiation-powerful-tools-to-change-the-game-in-your-mo": "./books/3DNegotiationPowerfulToolsToChangeTheGameInYourMoExpanded.ts",
  "a-comparative-study-of-the-majjhima-nikaya-volume-1": "./books/aComparativeStudyOfTheMajjhimaNikayaVolume1Expanded.ts",
  "a-comparative-study-of-the-majjhima-nikaya-volume-2": "./books/aComparativeStudyOfTheMajjhimaNikayaVolume2Expanded.ts",
  "a-comprehensive-manual-of-abhidhamma": "./books/aComprehensiveManualOfAbhidhammaExpanded.ts",
  "a-concise-introduction-to-logic": "./books/aConciseIntroductionToLogicExpanded.ts",
  "a-discourse-on-the-cula-vedalla-sutta": "./books/aDiscourseOnTheCulaVedallaSuttaExpanded.ts",
  "a-discourse-on-the-maha-vedalla-sutta": "./books/aDiscourseOnTheMahaVedallaSuttaExpanded.ts",
  "a-discourse-on-the-sakkapanha-sutta": "./books/aDiscourseOnTheSakkapanhaSuttaExpanded.ts",
  "a-life-of-blessing-celebrating-virtue-and-stillness": "./books/aLifeOfBlessingCelebratingVirtueAndStillnessExpanded.ts",
  "a-million-miles-in-a-thousand-years": "./books/aMillionMilesInAThousandYearsExpanded.ts",
  "a-mind-for-numbers": "./books/aMindForNumbersExpanded.ts",
  "a-simple-way-the-heart-of-the-practice": "./books/aSimpleWayTheHeartOfThePracticeExpanded.ts",
  "a-still-forest-pool-insight-meditation-of-achaan-chah": "./books/aStillForestPoolInsightMeditationOfAchaanChahExpanded.ts",
  "a-taste-of-freedom": "./books/aTasteOfFreedomExpanded.ts",
  "a-theory-of-cognitive-dissonance": "./books/aTheoryOfCognitiveDissonanceExpanded.ts",
  "abundant-exalted-immeasurable-the-brahmaviharas": "./books/abundantExaltedImmeasurableTheBrahmaviharasExpanded.ts",
  "algorithms-to-live-by": "./books/algorithmsToLiveByExpanded.ts",
  "alone-together-why-we-expect-more-from-technology-and-less-f": "./books/aloneTogetherWhyWeExpectMoreFromTechnologyAndLessFExpanded.ts",
  "an-illustrated-book-of-bad-arguments": "./books/anIllustratedBookOfBadArgumentsExpanded.ts",
  "an-inquiring-mind-s-journey-into-vipassana": "./books/anInquiringMindSJourneyIntoVipassanaExpanded.ts",
  "an-introduction-to-reasoning": "./books/anIntroductionToReasoningExpanded.ts",
  "anatta-and-nibbana-egolessness-and-deliverance": "./books/anattaAndNibbanaEgolessnessAndDeliveranceExpanded.ts",
  "anger-wisdom-for-cooling-the-flames": "./books/angerWisdomForCoolingTheFlamesExpanded.ts",
  "antifragile-things-that-gain-from-disorder": "./books/antifragileThingsThatGainFromDisorderExpanded.ts",
  "arahattamagga-arahattaphala-the-path-to-arahantship": "./books/arahattamaggaArahattaphalaThePathToArahantshipExpanded.ts",
  "argumentation-and-debate-critical-thinking-for-reasoned-deci": "./books/argumentationAndDebateCriticalThinkingForReasonedDeciExpanded.ts",
  "atomic-habits": "./books/atomicHabitsExpanded.ts",
  "attacking-faulty-reasoning": "./books/attackingFaultyReasoningExpanded.ts",
  "attention-span": "./books/attentionSpanExpanded.ts",
  "awareness-alone-is-not-enough": "./books/awarenessAloneIsNotEnoughExpanded.ts",
  "bargaining-for-advantage-negotiation-strategies-for-reasonab": "./books/bargainingForAdvantageNegotiationStrategiesForReasonabExpanded.ts",
  "becoming-a-supple-leopard": "./books/becomingASuppleLeopardExpanded.ts",
  "being-dharma-the-essence-of-the-buddha-s-teachings": "./books/beingDharmaTheEssenceOfTheBuddhaSTeachingsExpanded.ts",
  "being-logical-a-guide-to-good-thinking": "./books/beingLogicalAGuideToGoodThinkingExpanded.ts",
  "better-than-before": "./books/betterThanBeforeExpanded.ts",
  "beyond-all-directions-essays-on-nirvana": "./books/beyondAllDirectionsEssaysOnNirvanaExpanded.ts",
  "bhavana-mind-development-in-everyday-reality": "./books/bhavanaMindDevelopmentInEverydayRealityExpanded.ts",
  "blink-the-power-of-thinking-without-thinking": "./books/blinkThePowerOfThinkingWithoutThinkingExpanded.ts",
  "bodhinyana-a-collection-of-dhamma-talks": "./books/bodhinyanaACollectionOfDhammaTalksExpanded.ts",
  "bored-and-brilliant": "./books/boredAndBrilliantExpanded.ts",
  "born-to-run": "./books/bornToRunExpanded.ts",
  "boundaries-when-to-say-yes-how-to-say-no-to-take-control-of-": "./books/boundariesWhenToSayYesHowToSayNoToTakeControlOfExpanded.ts",
  "brahmavihara-the-four-immeasurables-in-early-buddhism": "./books/brahmaviharaTheFourImmeasurablesInEarlyBuddhismExpanded.ts",
  "breakthrough-realizing-the-deathless-in-this-life": "./books/breakthroughRealizingTheDeathlessInThisLifeExpanded.ts",
  "breath-the-new-science-of-a-lost-art": "./books/breathTheNewScienceOfALostArtExpanded.ts",
  "breathing-like-a-buddha": "./books/breathingLikeABuddhaExpanded.ts",
  "broad-view-boundless-heart": "./books/broadViewBoundlessHeartExpanded.ts",
  "buddhism-and-the-ecology-of-mind": "./books/buddhismAndTheEcologyOfMindExpanded.ts",
  "buddhism-and-the-god-idea": "./books/buddhismAndTheGodIdeaExpanded.ts",
  "building-a-second-brain": "./books/buildingASecondBrainExpanded.ts",
  "built-from-broken": "./books/builtFromBrokenExpanded.ts",
  "bullshit-jobs-on-bullshit": "./books/bullshitJobsOnBullshitExpanded.ts",
  "cittaviveka-teachings-from-the-silent-mind": "./books/cittavivekaTeachingsFromTheSilentMindExpanded.ts",
  "clarity-of-insight-selected-forest-dhamma": "./books/clarityOfInsightSelectedForestDhammaExpanded.ts",
  "clear-thinking": "./books/clearThinkingExpanded.ts",
  "cognitive-psychology-mind-and-brain": "./books/cognitivePsychologyMindAndBrainExpanded.ts",
  "compassion-and-emptiness-in-early-buddhist-meditation": "./books/compassionAndEmptinessInEarlyBuddhistMeditationExpanded.ts",
  "complexity-a-guided-tour": "./books/complexityAGuidedTourExpanded.ts",
  "connecting-across-differences": "./books/connectingAcrossDifferencesExpanded.ts",
  "contagious-why-things-catch-on": "./books/contagiousWhyThingsCatchOnExpanded.ts",
  "contemplation-of-dhamma-the-fourth-foundation": "./books/contemplationOfDhammaTheFourthFoundationExpanded.ts",
  "continuous-mindfulness-in-dynamic-living": "./books/continuousMindfulnessInDynamicLivingExpanded.ts",
  "conversational-intelligence-how-great-leaders-build-trust-an": "./books/conversationalIntelligenceHowGreatLeadersBuildTrustAnExpanded.ts",
  "crucial-conversations-tools-for-talking-when-stakes-are-high": "./books/crucialConversationsToolsForTalkingWhenStakesAreHighExpanded.ts",
  "curation-the-power-of-selection-in-a-world-of-excess": "./books/curationThePowerOfSelectionInAWorldOfExcessExpanded.ts",
  "dana-the-practice-of-giving": "./books/danaThePracticeOfGivingExpanded.ts",
  "daring-greatly": "./books/daringGreatlyExpanded.ts",
  "daughters-and-sons-buddhist-wisdom-on-parenting": "./books/daughtersAndSonsBuddhistWisdomOnParentingExpanded.ts",
  "dbt-skills-training-handouts-and-worksheets": "./books/dbtSkillsTrainingHandoutsAndWorksheetsExpanded.ts",
  "decisive": "./books/decisiveExpanded.ts",
  "deep-down-we-know": "./books/deepDownWeKnowExpanded.ts",
  "deep-work": "./books/deepWorkExpanded.ts",
  "dependent-arising-a-practical-guide-to-early-buddhist-teachings": "./books/dependentArisingAPracticalGuideToEarlyBuddhistTeachingsExpanded.ts",
  "designing-your-life-how-to-build-a-well-lived-joyful-life": "./books/designingYourLifeHowToBuildAWellLivedJoyfulLifeExpanded.ts",
  "dhamma-everywhere-freeing-the-mind-across-all-postures": "./books/dhammaEverywhereFreeingTheMindAcrossAllPosturesExpanded.ts",
  "dhamma-padetha-collection-of-insight-essays": "./books/dhammaPadethaCollectionOfInsightEssaysExpanded.ts",
  "difficult-conversations-how-to-discuss-what-matters-most": "./books/difficultConversationsHowToDiscussWhatMattersMostExpanded.ts",
  "digital-body-language-how-to-build-trust-and-connection-no-m": "./books/digitalBodyLanguageHowToBuildTrustAndConnectionNoMExpanded.ts",
  "disarming-the-narcissist": "./books/disarmingTheNarcissistExpanded.ts",
  "discourse-on-dependent-origination": "./books/discourseOnDependentOriginationExpanded.ts",
  "discourse-on-the-anattalakkhana-sutta": "./books/discourseOnTheAnattalakkhanaSuttaExpanded.ts",
  "discourse-on-the-ariyavasa-sutta": "./books/discourseOnTheAriyavasaSuttaExpanded.ts",
  "discourse-on-the-hemavata-sutta": "./books/discourseOnTheHemavataSuttaExpanded.ts",
  "discourse-on-the-malukyaputta-sutta": "./books/discourseOnTheMalukyaputtaSuttaExpanded.ts",
  "discourse-on-the-purabheda-sutta": "./books/discourseOnThePurabhedaSuttaExpanded.ts",
  "discourse-on-the-sallekha-sutta": "./books/discourseOnTheSallekhaSuttaExpanded.ts",
  "discourse-on-the-silavanta-sutta": "./books/discourseOnTheSilavantaSuttaExpanded.ts",
  "discourse-on-the-tuwathaka-sutta": "./books/discourseOnTheTuwathakaSuttaExpanded.ts",
  "discourse-on-the-vammika-sutta": "./books/discourseOnTheVammikaSuttaExpanded.ts",
  "discourse-on-the-wheel-of-dhamma": "./books/discourseOnTheWheelOfDhammaExpanded.ts",
  "do-the-work": "./books/doTheWorkExpanded.ts",
  "don-t-hold-back-monastic-reflections-on-practice": "./books/donTHoldBackMonasticReflectionsOnPracticeExpanded.ts",
  "don-t-look-at-the-mind-with-contempt": "./books/donTLookAtTheMindWithContemptExpanded.ts",
  "don-t-take-your-life-personally": "./books/donTTakeYourLifePersonallyExpanded.ts",
  "dopamine-nation-finding-balance-in-the-age-of-indulgence": "./books/dopamineNationFindingBalanceInTheAgeOfIndulgenceExpanded.ts",
  "early-buddhist-meditation-studies": "./books/earlyBuddhistMeditationStudiesExpanded.ts",
  "early-buddhist-oral-tradition-and-textual-transmission": "./books/earlyBuddhistOralTraditionAndTextualTransmissionExpanded.ts",
  "effortless-make-it-easier-to-do-what-matters-most": "./books/effortlessMakeItEasierToDoWhatMattersMostExpanded.ts",
  "elastic-habits": "./books/elasticHabitsExpanded.ts",
  "emotional-agility": "./books/emotionalAgilityExpanded.ts",
  "essentialism-the-disciplined-pursuit-of-less": "./books/essentialismTheDisciplinedPursuitOfLessExpanded.ts",
  "everything-arises-everything-falls-away": "./books/everythingArisesEverythingFallsAwayExpanded.ts",
  "everything-s-an-argument": "./books/everythingSAnArgumentExpanded.ts",
  "evolutionary-psychology-the-new-science-of-the-mind": "./books/evolutionaryPsychologyTheNewScienceOfTheMindExpanded.ts",
  "expert-political-judgment": "./books/expertPoliticalJudgmentExpanded.ts",
  "factfulness": "./books/factfulnessExpanded.ts",
  "fallacies-and-argument-appraisal": "./books/fallaciesAndArgumentAppraisalExpanded.ts",
  "feeling-good-the-new-mood-therapy": "./books/feelingGoodTheNewMoodTherapyExpanded.ts",
  "fierce-conversations-achieving-success-at-work-and-in-life-o": "./books/fierceConversationsAchievingSuccessAtWorkAndInLifeOExpanded.ts",
  "find-your-why": "./books/findYourWhyExpanded.ts",
  "finding-the-missing-peace-a-primer-of-meditation": "./books/findingTheMissingPeaceAPrimerOfMeditationExpanded.ts",
  "flow-the-psychology-of-optimal-experience": "./books/flowThePsychologyOfOptimalExperienceExpanded.ts",
  "food-for-the-heart-collected-teachings": "./books/foodForTheHeartCollectedTeachingsExpanded.ts",
  "fooled-by-randomness": "./books/fooledByRandomnessExpanded.ts",
  "forgive-for-good": "./books/forgiveForGoodExpanded.ts",
  "four-thousand-weeks-time-management-for-mortals": "./books/fourThousandWeeksTimeManagementForMortalsExpanded.ts",
  "from-heart-to-heart-selected-dhamma-talks": "./books/fromHeartToHeartSelectedDhammaTalksExpanded.ts",
  "fundamentals-of-vipassana-meditation": "./books/fundamentalsOfVipassanaMeditationExpanded.ts",
  "get-out-of-your-mind-and-into-your-life": "./books/getOutOfYourMindAndIntoYourLifeExpanded.ts",
  "getting-past-no-negotiating-with-difficult-people": "./books/gettingPastNoNegotiatingWithDifficultPeopleExpanded.ts",
  "getting-things-done-the-art-of-stress-free-productivity": "./books/gettingThingsDoneTheArtOfStressFreeProductivityExpanded.ts",
  "getting-to-yes-negotiating-agreement-without-giving-in": "./books/gettingToYesNegotiatingAgreementWithoutGivingInExpanded.ts",
  "going-for-refuge-and-taking-the-precepts": "./books/goingForRefugeAndTakingThePreceptsExpanded.ts",
  "good-reasons-for-better-arguments": "./books/goodReasonsForBetterArgumentsExpanded.ts",
  "great-disciples-of-the-buddha-their-lives-and-legacy": "./books/greatDisciplesOfTheBuddhaTheirLivesAndLegacyExpanded.ts",
  "he-understanding-masculine-psychology": "./books/heUnderstandingMasculinePsychologyExpanded.ts",
  "head-and-heart-together-essays-on-the-buddhist-path": "./books/headAndHeartTogetherEssaysOnTheBuddhistPathExpanded.ts",
  "healing-back-pain-the-mind-body-connection": "./books/healingBackPainTheMindBodyConnectionExpanded.ts",
  "healing-the-shame-that-binds-you": "./books/healingTheShameThatBindsYouExpanded.ts",
  "hell-yeah-or-no": "./books/hellYeahOrNoExpanded.ts",
  "honoring-the-self": "./books/honoringTheSelfExpanded.ts",
  "hope-and-help-for-your-nerves": "./books/hopeAndHelpForYourNervesExpanded.ts",
  "how-not-to-be-wrong-the-power-of-mathematical-thinking": "./books/howNotToBeWrongThePowerOfMathematicalThinkingExpanded.ts",
  "how-to-decide": "./books/howToDecideExpanded.ts",
  "how-to-have-impossible-conversations": "./books/howToHaveImpossibleConversationsExpanded.ts",
  "how-to-read-a-book": "./books/howToReadABookExpanded.ts",
  "how-to-take-smart-notes": "./books/howToTakeSmartNotesExpanded.ts",
  "how-to-win-any-argument": "./books/howToWinAnyArgumentExpanded.ts",
  "humble-inquiry-the-gentle-art-of-asking-instead-of-telling": "./books/humbleInquiryTheGentleArtOfAskingInsteadOfTellingExpanded.ts",
  "i-hear-you-the-surprisingly-simple-skill-behind-extraordinar": "./books/iHearYouTheSurprisinglySimpleSkillBehindExtraordinarExpanded.ts",
  "i-thought-it-was-just-me-but-it-isn-t": "./books/iThoughtItWasJustMeButItIsnTExpanded.ts",
  "ikigai-the-japanese-secret-to-a-long-and-happy-life": "./books/ikigaiTheJapaneseSecretToALongAndHappyLifeExpanded.ts",
  "in-defense-of-food": "./books/inDefenseOfFoodExpanded.ts",
  "in-sheep-s-clothing-understanding-and-dealing-with-manipulat": "./books/inSheepSClothingUnderstandingAndDealingWithManipulatExpanded.ts",
  "in-simple-terms-108-dhamma-similes": "./books/inSimpleTerms108DhammaSimilesExpanded.ts",
  "in-the-buddha-s-words-an-anthology-from-the-pali-canon": "./books/inTheBuddhaSWordsAnAnthologyFromThePaliCanonExpanded.ts",
  "in-the-realm-of-hungry-ghosts": "./books/inTheRealmOfHungryGhostsExpanded.ts",
  "in-this-very-life-the-liberation-teachings-of-the-buddha": "./books/inThisVeryLifeTheLiberationTeachingsOfTheBuddhaExpanded.ts",
  "indistractable-how-to-control-your-attention-and-choose-your": "./books/indistractableHowToControlYourAttentionAndChooseYourExpanded.ts",
  "influence-the-psychology-of-persuasion": "./books/influenceThePsychologyOfPersuasionExpanded.ts",
  "inner-strength-sixteen-aspects-of-the-dhamma": "./books/innerStrengthSixteenAspectsOfTheDhammaExpanded.ts",
  "inner-work-using-dreams-and-active-imagination-for-personal-": "./books/innerWorkUsingDreamsAndActiveImaginationForPersonalExpanded.ts",
  "insight-meditation-the-path-to-peace": "./books/insightMeditationThePathToPeaceExpanded.ts",
  "insight-meditation-workshop-manual": "./books/insightMeditationWorkshopManualExpanded.ts",
  "into-the-stream-a-study-guide-on-the-first-stage-of-awakening": "./books/intoTheStreamAStudyGuideOnTheFirstStageOfAwakeningExpanded.ts",
  "introduction-to-logic": "./books/introductionToLogicExpanded.ts",
  "intuitive-awareness-living-in-the-unconditioned": "./books/intuitiveAwarenessLivingInTheUnconditionedExpanded.ts",
  "investigating-the-dhamma-a-collection-of-essays": "./books/investigatingTheDhammaACollectionOfEssaysExpanded.ts",
  "invisible-influence-the-hidden-forces-that-shape-behavior": "./books/invisibleInfluenceTheHiddenForcesThatShapeBehaviorExpanded.ts",
  "just-listen-discover-the-secret-to-getting-through-to-absolu": "./books/justListenDiscoverTheSecretToGettingThroughToAbsoluExpanded.ts",
  "just-one-more-breath-teachings-on-meditation-and-life": "./books/justOneMoreBreathTeachingsOnMeditationAndLifeExpanded.ts",
  "just-one-word-mindfulness": "./books/justOneWordMindfulnessExpanded.ts",
  "keeping-the-breath-in-mind-lessons-in-samadhi": "./books/keepingTheBreathInMindLessonsInSamadhiExpanded.ts",
  "kill-it-with-fire-manage-aging-computer-systems-and-communic": "./books/killItWithFireManageAgingComputerSystemsAndCommunicExpanded.ts",
  "king-warrior-magician-lover": "./books/kingWarriorMagicianLoverExpanded.ts",
  "learn-like-a-pro": "./books/learnLikeAProExpanded.ts",
  "learned-optimism": "./books/learnedOptimismExpanded.ts",
  "life-is-in-the-transitions": "./books/lifeIsInTheTransitionsExpanded.ts",
  "like-a-clear-sky-dhamma-reflections": "./books/likeAClearSkyDhammaReflectionsExpanded.ts",
  "limitless": "./books/limitlessExpanded.ts",
  "linked-how-everything-is-connected": "./books/linkedHowEverythingIsConnectedExpanded.ts",
  "listen-like-you-mean-it-reclaiming-the-lost-art-of-true-conn": "./books/listenLikeYouMeanItReclaimingTheLostArtOfTrueConnExpanded.ts",
  "living-dhamma": "./books/livingDhammaExpanded.ts",
  "living-forward-a-proven-plan-to-stop-drifting": "./books/livingForwardAProvenPlanToStopDriftingExpanded.ts",
  "living-nonviolent-communication": "./books/livingNonviolentCommunicationExpanded.ts",
  "living-the-dhamma-hour-by-hour": "./books/livingTheDhammaHourByHourExpanded.ts",
  "logic-a-very-short-introduction": "./books/logicAVeryShortIntroductionExpanded.ts",
  "logically-fallacious": "./books/logicallyFallaciousExpanded.ts",
  "lost-art-of-listening-how-learning-to-listen-can-improve-rel": "./books/lostArtOfListeningHowLearningToListenCanImproveRelExpanded.ts",
  "lost-connections-uncovering-the-real-causes-of-depression": "./books/lostConnectionsUncoveringTheRealCausesOfDepressionExpanded.ts",
  "make-it-stick-the-science-of-successful-learning": "./books/makeItStickTheScienceOfSuccessfulLearningExpanded.ts",
  "make-time-how-to-focus-on-what-matters-every-day": "./books/makeTimeHowToFocusOnWhatMattersEveryDayExpanded.ts",
  "man-and-his-symbols": "./books/manAndHisSymbolsExpanded.ts",
  "man-s-search-for-meaning": "./books/manSSearchForMeaningExpanded.ts",
  "manual-of-buddhist-vipassana-practice": "./books/manualOfBuddhistVipassanaPracticeExpanded.ts",
  "manual-of-insight": "./books/manualOfInsightExpanded.ts",
  "meditation-instructions-for-intensive-practice": "./books/meditationInstructionsForIntensivePracticeExpanded.ts",
  "meditation-on-the-mind-mindful-watching-of-thoughts": "./books/meditationOnTheMindMindfulWatchingOfThoughtsExpanded.ts",
  "meditations-1-dhamma-talks": "./books/meditations1DhammaTalksExpanded.ts",
  "meditations-2-dhamma-talks": "./books/meditations2DhammaTalksExpanded.ts",
  "meditations-3-dhamma-talks": "./books/meditations3DhammaTalksExpanded.ts",
  "meditations-4-dhamma-talks": "./books/meditations4DhammaTalksExpanded.ts",
  "meditations-5-dhamma-talks": "./books/meditations5DhammaTalksExpanded.ts",
  "meditations": "./books/meditationsExpanded.ts",
  "meeting-the-shadow-the-hidden-power-of-the-dark-side-of-huma": "./books/meetingTheShadowTheHiddenPowerOfTheDarkSideOfHumaExpanded.ts",
  "memories-dreams-reflections": "./books/memoriesDreamsReflectionsExpanded.ts",
  "methods-of-persuasion": "./books/methodsOfPersuasionExpanded.ts",
  "mind-like-fire-unbound": "./books/mindLikeFireUnboundExpanded.ts",
  "mind-over-mood": "./books/mindOverMoodExpanded.ts",
  "mindfully-facing-disease-and-death": "./books/mindfullyFacingDiseaseAndDeathExpanded.ts",
  "mindfulness-bliss-and-beyond-a-meditator-s-handbook": "./books/mindfulnessBlissAndBeyondAMeditatorSHandbookExpanded.ts",
  "mindfulness-of-breathing-a-practice-guide-and-translations": "./books/mindfulnessOfBreathingAPracticeGuideAndTranslationsExpanded.ts",
  "mindfulness-of-the-body-the-first-foundation": "./books/mindfulnessOfTheBodyTheFirstFoundationExpanded.ts",
  "mindfulness-the-path-to-the-deathless": "./books/mindfulnessThePathToTheDeathlessExpanded.ts",
  "mindset-the-new-psychology-of-success": "./books/mindsetTheNewPsychologyOfSuccessExpanded.ts",
  "mini-habits": "./books/miniHabitsExpanded.ts",
  "mistakes-were-made-but-not-by-me": "./books/mistakesWereMadeButNotByMeExpanded.ts",
  "moonwalking-with-einstein": "./books/moonwalkingWithEinsteinExpanded.ts",
  "negotiating-the-nonnegotiable-how-to-resolve-your-most-emoti": "./books/negotiatingTheNonnegotiableHowToResolveYourMostEmotiExpanded.ts",
  "negotiation-genius": "./books/negotiationGeniusExpanded.ts",
  "never-split-the-difference-negotiating-as-if-your-life-depen": "./books/neverSplitTheDifferenceNegotiatingAsIfYourLifeDepenExpanded.ts",
  "no-ajahn-chah-reflections-of-a-master": "./books/noAjahnChahReflectionsOfAMasterExpanded.ts",
  "no-bad-parts-healing-trauma-and-restoring-wholeness-with-the": "./books/noBadPartsHealingTraumaAndRestoringWholenessWithTheExpanded.ts",
  "no-hard-feelings-the-secret-power-of-embracing-emotions-at-w": "./books/noHardFeelingsTheSecretPowerOfEmbracingEmotionsAtWExpanded.ts",
  "no-more-mr-nice-guy": "./books/noMoreMrNiceGuyExpanded.ts",
  "noble-strategy-essays-on-the-buddhist-path": "./books/nobleStrategyEssaysOnTheBuddhistPathExpanded.ts",
  "nonviolent-communication-a-language-of-life": "./books/nonviolentCommunicationALanguageOfLifeExpanded.ts",
  "not-nice-stop-people-pleasing-staying-silent-feeling-guilty": "./books/notNiceStopPeoplePleasingStayingSilentFeelingGuiltyExpanded.ts",
  "now-is-the-knowing": "./books/nowIsTheKnowingExpanded.ts",
  "nudge": "./books/nudgeExpanded.ts",
  "on-love-dhamma-talks-on-metta": "./books/onLoveDhammaTalksOnMettaExpanded.ts",
  "on-the-path-an-anthology-of-suttas-on-the-noble-eightfold-path": "./books/onThePathAnAnthologyOfSuttasOnTheNobleEightfoldPathExpanded.ts",
  "on-the-path-to-freedom": "./books/onThePathToFreedomExpanded.ts",
  "one-small-step-can-change-your-life-the-kaizen-way": "./books/oneSmallStepCanChangeYourLifeTheKaizenWayExpanded.ts",
  "opening-the-door-of-your-heart": "./books/openingTheDoorOfYourHeartExpanded.ts",
  "our-real-home-teachings-for-approaching-death": "./books/ourRealHomeTeachingsForApproachingDeathExpanded.ts",
  "outlive-the-science-and-art-of-longevity": "./books/outliveTheScienceAndArtOfLongevityExpanded.ts",
  "overcoming-destructive-anger": "./books/overcomingDestructiveAngerExpanded.ts",
  "overcoming-gravity": "./books/overcomingGravityExpanded.ts",
  "owning-your-own-shadow": "./books/owningYourOwnShadowExpanded.ts",
  "parami-ways-to-cross-life-s-floats": "./books/paramiWaysToCrossLifeSFloatsExpanded.ts",
  "peace-beyond-suffering": "./books/peaceBeyondSufferingExpanded.ts",
  "peace-is-a-dynamic-process": "./books/peaceIsADynamicProcessExpanded.ts",
  "peak-performance": "./books/peakPerformanceExpanded.ts",
  "permission-to-feel": "./books/permissionToFeelExpanded.ts",
  "perspectives-on-satipatthana": "./books/perspectivesOnSatipatthanaExpanded.ts",
  "pivot-the-only-move-that-matters-is-your-next-one": "./books/pivotTheOnlyMoveThatMattersIsYourNextOneExpanded.ts",
  "plato-s-republic-selected-dialogues": "./books/platoSRepublicSelectedDialoguesExpanded.ts",
  "poor-charlie-s-almanack": "./books/poorCharlieSAlmanackExpanded.ts",
  "power-questions-build-relationships-win-new-business-and-inf": "./books/powerQuestionsBuildRelationshipsWinNewBusinessAndInfExpanded.ts",
  "practical-vipassana-meditative-exercises": "./books/practicalVipassanaMeditativeExercisesExpanded.ts",
  "pre-suasion-a-revolutionary-way-to-influence-and-persuade": "./books/preSuasionARevolutionaryWayToInfluenceAndPersuadeExpanded.ts",
  "primal-leadership": "./books/primalLeadershipExpanded.ts",
  "protection-through-satipatthana": "./books/protectionThroughSatipatthanaExpanded.ts",
  "the-psychology-of-money-timeless-lessons-on-wealth-greed-and": "./books/psychologyOfMoneyExpanded.ts",
  "purification-of-mind-and-view": "./books/purificationOfMindAndViewExpanded.ts",
  "purity-of-heart-essays-on-the-buddhist-path": "./books/purityOfHeartEssaysOnTheBuddhistPathExpanded.ts",
  "radical-acceptance": "./books/radicalAcceptanceExpanded.ts",
  "radical-compassion": "./books/radicalCompassionExpanded.ts",
  "range-why-generalists-triumph-in-a-specialized-world": "./books/rangeWhyGeneralistsTriumphInASpecializedWorldExpanded.ts",
  "rational-recovery": "./books/rationalRecoveryExpanded.ts",
  "reading-the-buddha-s-discourses-in-pali": "./books/readingTheBuddhaSDiscoursesInPaliExpanded.ts",
  "rebirth-in-early-buddhism-and-current-research": "./books/rebirthInEarlyBuddhismAndCurrentResearchExpanded.ts",
  "reclaiming-conversation-the-power-of-talk-in-a-digital-age": "./books/reclaimingConversationThePowerOfTalkInADigitalAgeExpanded.ts",
  "reinventing-you": "./books/reinventingYouExpanded.ts",
  "reinventing-your-life": "./books/reinventingYourLifeExpanded.ts",
  "relax-and-be-aware-mindfulness-in-daily-life": "./books/relaxAndBeAwareMindfulnessInDailyLifeExpanded.ts",
  "remote-office-not-required": "./books/remoteOfficeNotRequiredExpanded.ts",
  "rest-why-you-get-more-done-when-you-work-less": "./books/restWhyYouGetMoreDoneWhenYouWorkLessExpanded.ts",
  "rethinking-narcissism-anger": "./books/rethinkingNarcissismAngerExpanded.ts",
  "right-mindfulness-memory-and-ardency-on-the-buddhist-path": "./books/rightMindfulnessMemoryAndArdencyOnTheBuddhistPathExpanded.ts",
  "risk-savvy-how-to-make-good-decisions": "./books/riskSavvyHowToMakeGoodDecisionsExpanded.ts",
  "satipatthana-meditation-a-practice-guide": "./books/satipatthanaMeditationAPracticeGuideExpanded.ts",
  "satipatthana-the-direct-path-to-realization": "./books/satipatthanaTheDirectPathToRealizationExpanded.ts",
  "satipatthana-vipassana-meditation-basic-and-progressive-practice": "./books/satipatthanaVipassanaMeditationBasicAndProgressivePracticeExpanded.ts",
  "say-good-night-to-insomnia": "./books/sayGoodNightToInsomniaExpanded.ts",
  "say-what-you-mean-a-mindful-approach-to-nonviolent-communica": "./books/sayWhatYouMeanAMindfulApproachToNonviolentCommunicaExpanded.ts",
  "saying-no-to-say-yes": "./books/sayingNoToSayYesExpanded.ts",
  "scale": "./books/scaleExpanded.ts",
  "search-inside-yourself": "./books/searchInsideYourselfExpanded.ts",
  "seeing-systems-unlocking-the-mysteries-of-organizational-lif": "./books/seeingSystemsUnlockingTheMysteriesOfOrganizationalLifExpanded.ts",
  "seeking-buddho-teachings-on-meditation": "./books/seekingBuddhoTeachingsOnMeditationExpanded.ts",
  "self-compassion-the-proven-power-of-being-kind-to-yourself": "./books/selfCompassionTheProvenPowerOfBeingKindToYourselfExpanded.ts",
  "selves-and-not-self-buddhist-epistemology": "./books/selvesAndNotSelfBuddhistEpistemologyExpanded.ts",
  "set-boundaries-find-peace-a-guide-to-reclaiming-yourself": "./books/setBoundariesFindPeaceAGuideToReclaimingYourselfExpanded.ts",
  "7-powers-the-foundations-of-business-strategy": "./books/sevenPowersExpanded.ts",
  "she-understanding-feminine-psychology": "./books/sheUnderstandingFemininePsychologyExpanded.ts",
  "show-your-work": "./books/showYourWorkExpanded.ts",
  "silent-rain-collected-dhamma-talks": "./books/silentRainCollectedDhammaTalksExpanded.ts",
  "simple-teachings-on-higher-truths": "./books/simpleTeachingsOnHigherTruthsExpanded.ts",
  "skill-in-questions-how-the-buddha-taught": "./books/skillInQuestionsHowTheBuddhaTaughtExpanded.ts",
  "skin-in-the-game": "./books/skinInTheGameExpanded.ts",
  "sleep-smarter": "./books/sleepSmarterExpanded.ts",
  "slight-edge": "./books/slightEdgeExpanded.ts",
  "small-boat-great-mountain-reflections-on-dzogchen-and-theravada": "./books/smallBoatGreatMountainReflectionsOnDzogchenAndTheravadaExpanded.ts",
  "smart-brevity-the-power-of-saying-more-with-less": "./books/smartBrevityThePowerOfSayingMoreWithLessExpanded.ts",
  "smart-choices": "./books/smartChoicesExpanded.ts",
  "snakes-in-suits-when-psychopaths-go-to-work": "./books/snakesInSuitsWhenPsychopathsGoToWorkExpanded.ts",
  "so-good-they-can-t-ignore-you": "./books/soGoodTheyCanTIgnoreYouExpanded.ts",
  "socratic-logic": "./books/socraticLogicExpanded.ts",
  "solving-the-procrastination-puzzle": "./books/solvingTheProcrastinationPuzzleExpanded.ts",
  "somatics-reawakening-the-mind-s-control-of-movement": "./books/somaticsReawakeningTheMindSControlOfMovementExpanded.ts",
  "sources-of-power": "./books/sourcesOfPowerExpanded.ts",
  "speak-peace-in-a-world-of-conflict": "./books/speakPeaceInAWorldOfConflictExpanded.ts",
  "start-with-no-the-negotiating-tools-that-the-pros-don-t-want": "./books/startWithNoTheNegotiatingToolsThatTheProsDonTWantExpanded.ts",
  "start-with-why-how-great-leaders-inspire-everyone-to-take-ac": "./books/startWithWhyHowGreatLeadersInspireEveryoneToTakeAcExpanded.ts",
  "starting-strength-basic-barbell-training": "./books/startingStrengthBasicBarbellTrainingExpanded.ts",
  "stick-with-it": "./books/stickWithItExpanded.ts",
  "stillness-flowing-the-life-and-teachings-of-ajahn-chah": "./books/stillnessFlowingTheLifeAndTeachingsOfAjahnChahExpanded.ts",
  "stolen-focus-why-you-can-t-pay-attention": "./books/stolenFocusWhyYouCanTPayAttentionExpanded.ts",
  "stop-walking-on-eggshells": "./books/stopWalkingOnEggshellsExpanded.ts",
  "straight-from-the-heart-dhamma-talks": "./books/straightFromTheHeartDhammaTalksExpanded.ts",
  "strangers-to-ourselves-discovering-the-adaptive-unconscious": "./books/strangersToOurselvesDiscoveringTheAdaptiveUnconsciousExpanded.ts",
  "super-thinking-the-big-book-of-mental-models": "./books/superThinkingTheBigBookOfMentalModelsExpanded.ts",
  "supercommunicators-how-to-unlock-the-secret-language-of-conn": "./books/supercommunicatorsHowToUnlockTheSecretLanguageOfConnExpanded.ts",
  "superforecasting-the-art-and-science-of-prediction": "./books/superforecastingTheArtAndScienceOfPredictionExpanded.ts",
  "superiority-conceit-in-buddhist-traditions": "./books/superiorityConceitInBuddhistTraditionsExpanded.ts",
  "sync-how-order-emerges-from-chaos": "./books/syncHowOrderEmergesFromChaosExpanded.ts",
  "teachings-of-a-buddhist-monk": "./books/teachingsOfABuddhistMonkExpanded.ts",
  "thank-you-for-arguing": "./books/thankYouForArguingExpanded.ts",
  "thanks-for-the-feedback-the-science-and-art-of-receiving-fee": "./books/thanksForTheFeedbackTheScienceAndArtOfReceivingFeeExpanded.ts",
  "the-1-rule": "./books/the1RuleExpanded.ts",
  "the-5-second-rule": "./books/the5SecondRuleExpanded.ts",
  "the-80-20-principle": "./books/the8020PrincipleExpanded.ts",
  "the-accountability-manifesto": "./books/theAccountabilityManifestoExpanded.ts",
  "the-all-embracing-net-of-views-brahmajala-sutta": "./books/theAllEmbracingNetOfViewsBrahmajalaSuttaExpanded.ts",
  "the-anxiety-and-phobia-workbook": "./books/theAnxietyAndPhobiaWorkbookExpanded.ts",
  "the-archetypes-and-the-collective-unconscious": "./books/theArchetypesAndTheCollectiveUnconsciousExpanded.ts",
  "the-art-of-being-right-the-art-of-controversy": "./books/theArtOfBeingRightTheArtOfControversyExpanded.ts",
  "the-art-of-communicating": "./books/theArtOfCommunicatingExpanded.ts",
  "the-art-of-dialogue": "./books/theArtOfDialogueExpanded.ts",
  "the-art-of-everyday-assertiveness": "./books/theArtOfEverydayAssertivenessExpanded.ts",
  "the-art-of-note-taking": "./books/theArtOfNoteTakingExpanded.ts",
  "the-art-of-persuasion": "./books/theArtOfPersuasionExpanded.ts",
  "the-art-of-work": "./books/theArtOfWorkExpanded.ts",
  "the-assertiveness-workbook": "./books/theAssertivenessWorkbookExpanded.ts",
  "the-asynchronous-mindset": "./books/theAsynchronousMindsetExpanded.ts",
  "the-attention-merchants": "./books/theAttentionMerchantsExpanded.ts",
  "the-black-swan": "./books/theBlackSwanExpanded.ts",
  "the-body-keeps-the-score": "./books/theBodyKeepsTheScoreExpanded.ts",
  "the-book-of-boundaries": "./books/theBookOfBoundariesExpanded.ts",
  "the-brain-that-changes-itself": "./books/theBrainThatChangesItselfExpanded.ts",
  "the-buddhist-monastic-code-volume-i": "./books/theBuddhistMonasticCodeVolumeIExpanded.ts",
  "the-buddhist-monastic-code-volume-ii": "./books/theBuddhistMonasticCodeVolumeIiExpanded.ts",
  "the-catalyst-how-to-change-anyone-s-mind": "./books/theCatalystHowToChangeAnyoneSMindExpanded.ts",
  "the-checklist-manifesto": "./books/theChecklistManifestoExpanded.ts",
  "the-circadian-code": "./books/theCircadianCodeExpanded.ts",
  "the-coaching-habit-say-less-ask-more-change-the-way-you-lead": "./books/theCoachingHabitSayLessAskMoreChangeTheWayYouLeadExpanded.ts",
  "the-compassionate-mind": "./books/theCompassionateMindExpanded.ts",
  "the-complete-guide-to-fasting": "./books/theCompleteGuideToFastingExpanded.ts",
  "the-compound-effect": "./books/theCompoundEffectExpanded.ts",
  "the-connected-discourses-of-the-buddha-samyutta-nikaya": "./books/theConnectedDiscoursesOfTheBuddhaSamyuttaNikayaExpanded.ts",
  "the-courage-to-be-disliked": "./books/theCourageToBeDislikedExpanded.ts",
  "the-craft-of-the-heart": "./books/theCraftOfTheHeartExpanded.ts",
  "the-crossroads-of-should-and-must": "./books/theCrossroadsOfShouldAndMustExpanded.ts",
  "the-crowd-a-study-of-the-popular-mind": "./books/theCrowdAStudyOfThePopularMindExpanded.ts",
  "the-dance-of-anger": "./books/theDanceOfAngerExpanded.ts",
  "the-dawn-of-abhidharma": "./books/theDawnOfAbhidharmaExpanded.ts",
  "the-dip-a-little-book-that-teaches-you-when-to-quit": "./books/theDipALittleBookThatTeachesYouWhenToQuitExpanded.ts",
  "the-discourse-on-the-root-of-existence-mulapariyaya-sutta": "./books/theDiscourseOnTheRootOfExistenceMulapariyayaSuttaExpanded.ts",
  "the-disease-to-please-curing-the-people-pleasing-syndrome": "./books/theDiseaseToPleaseCuringThePeoplePleasingSyndromeExpanded.ts",
  "the-distracted-mind-ancient-brains-in-a-high-tech-world": "./books/theDistractedMindAncientBrainsInAHighTechWorldExpanded.ts",
  "the-divided-mind-the-epidemic-of-mindbody-disorders": "./books/theDividedMindTheEpidemicOfMindbodyDisordersExpanded.ts",
  "the-easy-way-to-stop-smoking-stop-drinking": "./books/theEasyWayToStopSmokingStopDrinkingExpanded.ts",
  "the-evolution-of-desire-strategies-of-human-mating": "./books/theEvolutionOfDesireStrategiesOfHumanMatingExpanded.ts",
  "the-fifth-discipline": "./books/theFifthDisciplineExpanded.ts",
  "the-five-mental-hindrances-and-their-conquest": "./books/theFiveMentalHindrancesAndTheirConquestExpanded.ts",
  "the-forty-rules-of-love": "./books/theFortyRulesOfLoveExpanded.ts",
  "the-foundation-conditions-for-nirvana": "./books/theFoundationConditionsForNirvanaExpanded.ts",
  "the-four-foundations-of-mindfulness": "./books/theFourFoundationsOfMindfulnessExpanded.ts",
  "the-four-noble-truths": "./books/theFourNobleTruthsExpanded.ts",
  "the-four-nutriments-of-life": "./books/theFourNutrimentsOfLifeExpanded.ts",
  "the-four-sublime-states-brahma-vihara": "./books/theFourSublimeStatesBrahmaViharaExpanded.ts",
  "the-genesis-of-the-bodhisattva-ideal": "./books/theGenesisOfTheBodhisattvaIdealExpanded.ts",
  "the-gifts-of-imperfection": "./books/theGiftsOfImperfectionExpanded.ts",
  "the-great-discourse-on-causation-mahanidana-sutta": "./books/theGreatDiscourseOnCausationMahanidanaSuttaExpanded.ts",
  "the-great-mental-models-vol-1-2": "./books/theGreatMentalModelsVol12Expanded.ts",
  "the-heart-of-practice-ajaan-mun-s-dhamma-sermons": "./books/theHeartOfPracticeAjaanMunSDhammaSermonsExpanded.ts",
  "the-information-diet": "./books/theInformationDietExpanded.ts",
  "the-invisible-gorilla-how-our-intuitions-deceive-us": "./books/theInvisibleGorillaHowOurIntuitionsDeceiveUsExpanded.ts",
  "the-island-an-anthology-of-the-buddha-s-teachings-on-nibbana": "./books/theIslandAnAnthologyOfTheBuddhaSTeachingsOnNibbanaExpanded.ts",
  "the-karma-of-questions-essays-on-the-buddhist-path": "./books/theKarmaOfQuestionsEssaysOnTheBuddhistPathExpanded.ts",
  "the-key-to-liberation": "./books/theKeyToLiberationExpanded.ts",
  "the-life-of-sariputta": "./books/theLifeOfSariputtaExpanded.ts",
  "the-logic-of-scientific-discovery": "./books/theLogicOfScientificDiscoveryExpanded.ts",
  "the-lucifer-effect-understanding-how-good-people-turn-evil": "./books/theLuciferEffectUnderstandingHowGoodPeopleTurnEvilExpanded.ts",
  "the-memory-book": "./books/theMemoryBookExpanded.ts",
  "the-middle-length-discourses-of-the-buddha-majjhima-nikaya": "./books/theMiddleLengthDiscoursesOfTheBuddhaMajjhimaNikayaExpanded.ts",
  "the-mind-and-the-way-buddhist-reflections-on-life": "./books/theMindAndTheWayBuddhistReflectionsOnLifeExpanded.ts",
  "the-mind-that-knows": "./books/theMindThatKnowsExpanded.ts",
  "the-model-thinker": "./books/theModelThinkerExpanded.ts",
  "the-moral-animal": "./books/theMoralAnimalExpanded.ts",
  "the-narcissist-you-know": "./books/theNarcissistYouKnowExpanded.ts",
  "the-noble-eightfold-path-way-to-the-end-of-suffering": "./books/theNobleEightfoldPathWayToTheEndOfSufferingExpanded.ts",
  "the-noonday-demon-an-atlas-of-depression": "./books/theNoondayDemonAnAtlasOfDepressionExpanded.ts",
  "the-now-habit": "./books/theNowHabitExpanded.ts",
  "the-numerical-discourses-of-the-buddha-anguttara-nikaya": "./books/theNumericalDiscoursesOfTheBuddhaAnguttaraNikayaExpanded.ts",
  "the-obesity-code": "./books/theObesityCodeExpanded.ts",
  "the-one-thing": "./books/theOneThingExpanded.ts",
  "the-oxygen-advantage": "./books/theOxygenAdvantageExpanded.ts",
  "the-paradox-of-becoming-finding-freedom-in-the-cycle-of-becoming": "./books/theParadoxOfBecomingFindingFreedomInTheCycleOfBecomingExpanded.ts",
  "the-paradox-of-choice": "./books/theParadoxOfChoiceExpanded.ts",
  "the-path-made-clear": "./books/thePathMadeClearExpanded.ts",
  "the-polyvagal-theory-in-therapy": "./books/thePolyvagalTheoryInTherapyExpanded.ts",
  "the-power-of-a-positive-no-how-to-say-no-and-still-get-to-ye": "./books/thePowerOfAPositiveNoHowToSayNoAndStillGetToYeExpanded.ts",
  "the-power-of-full-engagement": "./books/thePowerOfFullEngagementExpanded.ts",
  "the-power-of-habit": "./books/thePowerOfHabitExpanded.ts",
  "the-power-of-mindfulness": "./books/thePowerOfMindfulnessExpanded.ts",
  "the-power-of-when": "./books/thePowerOfWhenExpanded.ts",
  "the-practice-of-vipassana-meditation": "./books/thePracticeOfVipassanaMeditationExpanded.ts",
  "the-progress-of-insight": "./books/theProgressOfInsightExpanded.ts",
  "the-progress-of-insight-through-mental-noting": "./books/theProgressOfInsightThroughMentalNotingExpanded.ts",
  "the-promise-of-sleep": "./books/thePromiseOfSleepExpanded.ts",
  "the-righteous-mind-why-good-people-are-divided-by-politics-a": "./books/theRighteousMindWhyGoodPeopleAreDividedByPoliticsAExpanded.ts",
  "the-road-to-inner-freedom": "./books/theRoadToInnerFreedomExpanded.ts",
  "the-roots-of-good-and-evil": "./books/theRootsOfGoodAndEvilExpanded.ts",
  "the-scout-mindset": "./books/theScoutMindsetExpanded.ts",
  "the-second-mountain-the-quest-for-a-moral-life": "./books/theSecondMountainTheQuestForAMoralLifeExpanded.ts",
  "the-selfish-gene": "./books/theSelfishGeneExpanded.ts",
  "the-seven-sins-of-memory": "./books/theSevenSinsOfMemoryExpanded.ts",
  "the-seven-stages-of-purification": "./books/theSevenStagesOfPurificationExpanded.ts",
  "the-shallows-what-the-internet-is-doing-to-our-brains": "./books/theShallowsWhatTheInternetIsDoingToOurBrainsExpanded.ts",
  "the-shape-of-suffering-a-study-of-dependent-co-arising": "./books/theShapeOfSufferingAStudyOfDependentCoArisingExpanded.ts",
  "the-signal-and-the-noise": "./books/theSignalAndTheNoiseExpanded.ts",
  "the-skill-of-release": "./books/theSkillOfReleaseExpanded.ts",
  "the-sleep-solution": "./books/theSleepSolutionExpanded.ts",
  "the-social-animal": "./books/theSocialAnimalExpanded.ts",
  "the-socratic-method-of-psychotherapy": "./books/theSocraticMethodOfPsychotherapyExpanded.ts",
  "the-soulful-art-of-persuasion": "./books/theSoulfulArtOfPersuasionExpanded.ts",
  "the-sound-of-silence-selected-teachings": "./books/theSoundOfSilenceSelectedTeachingsExpanded.ts",
  "the-state-of-mind-called-beautiful": "./books/theStateOfMindCalledBeautifulExpanded.ts",
  "the-sutta-discovery-early-buddhist-teachings": "./books/theSuttaDiscoveryEarlyBuddhistTeachingsExpanded.ts",
  "the-suttanipata-an-ancient-collection-of-discourses": "./books/theSuttanipataAnAncientCollectionOfDiscoursesExpanded.ts",
  "the-systems-view-of-life": "./books/theSystemsViewOfLifeExpanded.ts",
  "the-upward-spiral": "./books/theUpwardSpiralExpanded.ts",
  "the-uses-of-argument": "./books/theUsesOfArgumentExpanded.ts",
  "the-war-of-art": "./books/theWarOfArtExpanded.ts",
  "the-way-to-the-guru-meditative-guidance": "./books/theWayToTheGuruMeditativeGuidanceExpanded.ts",
  "the-willpower-instinct": "./books/theWillpowerInstinctExpanded.ts",
  "the-wings-to-awakening-an-anthology-from-the-pali-canon": "./books/theWingsToAwakeningAnAnthologyFromThePaliCanonExpanded.ts",
  "the-worn-out-skin-reflections-on-the-uraga-sutta": "./books/theWornOutSkinReflectionsOnTheUragaSuttaExpanded.ts",
  "the-worry-trick": "./books/theWorryTrickExpanded.ts",
  "think-again-the-power-of-knowing-what-you-don-t-know": "./books/thinkAgainThePowerOfKnowingWhatYouDonTKnowExpanded.ts",
  "thinking-fast-and-slow": "./books/thinkingFastAndSlowExpanded.ts",
  "thinking-in-bets": "./books/thinkingInBetsExpanded.ts",
  "thinking-in-systems-a-primer": "./books/thinkingInSystemsAPrimerExpanded.ts",
  "this-naked-mind": "./books/thisNakedMindExpanded.ts",
  "time-smart-how-to-reclaim-your-time-and-live-a-happier-life": "./books/timeSmartHowToReclaimYourTimeAndLiveAHappierLifeExpanded.ts",
  "timeless-wisdom-in-depth-dhamma-talks": "./books/timelessWisdomInDepthDhammaTalksExpanded.ts",
  "tiny-habits-the-small-changes-that-change-everything": "./books/tinyHabitsTheSmallChangesThatChangeEverythingExpanded.ts",
  "to-sell-is-human-the-surprising-truth-about-moving-others": "./books/toSellIsHumanTheSurprisingTruthAboutMovingOthersExpanded.ts",
  "to-the-last-breath-dhamma-talks-on-illness-and-death": "./books/toTheLastBreathDhammaTalksOnIllnessAndDeathExpanded.ts",
  "transcendental-dependent-arising": "./books/transcendentalDependentArisingExpanded.ts",
  "transitions-making-sense-of-life-s-changes": "./books/transitionsMakingSenseOfLifeSChangesExpanded.ts",
  "treatise-on-the-vipassana-insight-practice": "./books/treatiseOnTheVipassanaInsightPracticeExpanded.ts",
  "tug-of-vow-monastic-training-in-the-forest-tradition": "./books/tugOfVowMonasticTrainingInTheForestTraditionExpanded.ts",
  "turning-the-wheel-of-truth": "./books/turningTheWheelOfTruthExpanded.ts",
  "ultralearning": "./books/ultralearningExpanded.ts",
  "unexpected-freedom-dhamma-reflections": "./books/unexpectedFreedomDhammaReflectionsExpanded.ts",
  "unlearn-your-pain": "./books/unlearnYourPainExpanded.ts",
  "untamed": "./books/untamedExpanded.ts",
  "unwinding-anxiety": "./books/unwindingAnxietyExpanded.ts",
  "venerable-acariya-mun-bhuridatta-spiritual-biography": "./books/venerableAcariyaMunBhuridattaSpiritualBiographyExpanded.ts",
  "vipassana-meditation-guidelines": "./books/vipassanaMeditationGuidelinesExpanded.ts",
  "vipassana-meditation-lectures-on-insight": "./books/vipassanaMeditationLecturesOnInsightExpanded.ts",
  "vipassana-talks-from-mahasi-sasana-yeiktha": "./books/vipassanaTalksFromMahasiSasanaYeikthaExpanded.ts",
  "volition-the-real-mastermind-behind-kamma": "./books/volitionTheRealMastermindBehindKammaExpanded.ts",
  "we-need-to-talk-how-to-have-conversations-that-matter": "./books/weNeedToTalkHowToHaveConversationsThatMatterExpanded.ts",
  "when-awareness-becomes-natural": "./books/whenAwarenessBecomesNaturalExpanded.ts",
  "when-i-say-no-i-feel-guilty": "./books/whenISayNoIFeelGuiltyExpanded.ts",
  "when-panic-attacks": "./books/whenPanicAttacksExpanded.ts",
  "when-the-scientific-secrets-of-perfect-timing": "./books/whenTheScientificSecretsOfPerfectTimingExpanded.ts",
  "where-to-draw-the-line-how-to-set-healthy-boundaries-every-d": "./books/whereToDrawTheLineHowToSetHealthyBoundariesEveryDExpanded.ts",
  "who-gets-what-and-why": "./books/whoGetsWhatAndWhyExpanded.ts",
  "who-moved-my-cheese": "./books/whoMovedMyCheeseExpanded.ts",
  "why-we-get-sick": "./books/whyWeGetSickExpanded.ts",
  "why-we-sleep-unlocking-the-power-of-sleep-and-dreams": "./books/whyWeSleepUnlockingThePowerOfSleepAndDreamsExpanded.ts",
  "willpower-doesn-t-work": "./books/willpowerDoesnTWorkExpanded.ts",
  "wim-hof-the-wim-hof-method": "./books/wimHofTheWimHofMethodExpanded.ts",
  "win-every-argument-the-art-of-debating-persuading-and-public": "./books/winEveryArgumentTheArtOfDebatingPersuadingAndPublicExpanded.ts",
  "wisdom-develops-samadhi": "./books/wisdomDevelopsSamadhiExpanded.ts",
  "with-each-and-every-breath-a-guide-to-meditation": "./books/withEachAndEveryBreathAGuideToMeditationExpanded.ts",
  "with-good-reason-an-introduction-to-informal-fallacies": "./books/withGoodReasonAnIntroductionToInformalFallaciesExpanded.ts",
  "without-and-within-questions-and-answers-on-theravada-buddhism": "./books/withoutAndWithinQuestionsAndAnswersOnTheravadaBuddhismExpanded.ts",
  "without-conscience-the-disturbing-world-of-the-psychopaths-a": "./books/withoutConscienceTheDisturbingWorldOfThePsychopathsAExpanded.ts",
  "words-can-change-your-brain": "./books/wordsCanChangeYourBrainExpanded.ts",
  "words-of-dhamma-practical-meditative-advice": "./books/wordsOfDhammaPracticalMeditativeAdviceExpanded.ts",
  "working-in-public-the-making-and-maintenance-of-open-source-": "./books/workingInPublicTheMakingAndMaintenanceOfOpenSourceExpanded.ts",
  "working-with-emotional-intelligence": "./books/workingWithEmotionalIntelligenceExpanded.ts",
  "write-once-read-forever-syntopic-knowledge": "./books/writeOnceReadForeverSyntopicKnowledgeExpanded.ts",
  "yes-50-scientifically-proven-ways-to-be-persuasive": "./books/yes50ScientificallyProvenWaysToBePersuasiveExpanded.ts",
  "you-are-not-so-smart": "./books/youAreNotSoSmartExpanded.ts",
  "your-erroneous-zones": "./books/yourErroneousZonesExpanded.ts",
  "your-perfect-right-assertiveness-and-equality-in-your-life-a": "./books/yourPerfectRightAssertivenessAndEqualityInYourLifeAExpanded.ts"
};

export const SEED_BOARDS: StashBoard[] = [
  {
    id: 'board-models',
    name: 'Mental Models',
    description: 'Frameworks for sharper reasoning and decision making',
    icon: '🧠',
    color: 'bg-emerald-500',
    createdAt: Date.now() - 86400000 * 10
  },
  {
    id: 'board-focus',
    name: 'Peak Focus & Flow',
    description: 'Tactics for deep work, distraction defense, and high output',
    icon: '⚡',
    color: 'bg-blue-500',
    createdAt: Date.now() - 86400000 * 8
  },
  {
    id: 'board-wealth',
    name: 'Financial Sovereignty',
    description: 'Long-term compounding, frugality, and autonomy',
    icon: '💎',
    color: 'bg-purple-500',
    createdAt: Date.now() - 86400000 * 5
  }
];

export const BOOK_CATALOG: Book[] = [
  {
    "id": "10-days-to-faster-reading",
    "title": "10 Days to Faster Reading",
    "author": "The Princeton Language Institute & Abby Marks Beale",
    "category": "Productivity",
    "subcategory": "Daily Systems & Workflows",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/9453897-M.jpg",
    "readingTimeMinutes": 50,
    "publishedYear": 2001,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your brain processes visual data at supercomputer speeds, yet your eyes are trapped using first-grade acoustic training. By decoupling physical voice mechanics from optical pattern recognition, you unlock effortless reading velocity and sharper retention.",
      "coreThesis": "Reading speed is limited by mechanical habits\\u2014inner speech, narrow focus, and visual back-tracking\\u2014not by mental comprehension. Streamlining ocular mechanics enables faster intake and deeper understanding.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "10 Days to Faster Reading"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "168-hours-you-have-more-time-than-you-think",
    "title": "168 Hours: You Have More Time Than You Think",
    "author": "Laura Vanderkam",
    "category": "Productivity",
    "subcategory": "Daily Systems & Workflows",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10618668-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2010,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop cramming your life into frantic 24-hour sprints and claim the full canvas of your 168-hour week. You have ample time to master your craft, nurture deep relationships, and recharge when you build around your genuine core competencies.",
      "coreThesis": "Time is a choice, not a crisis; viewed through the realistic canvas of a 168-hour week, you have abundant space to excel professionally and flourish personally once you dedicate your hours exclusively to your core competencies.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "168 Hours: You Have More Time Than You Think"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "3-d-negotiation-powerful-tools-to-change-the-game-in-your-mo",
    "title": "3-D Negotiation: Powerful Tools to Change the Game in Your Most Important Deals",
    "author": "David A. Lax & James K. Sebenius",
    "category": "Sales & Persuasion",
    "subcategory": "Persuasion & Influence",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/864082-M.jpg",
    "readingTimeMinutes": 75,
    "publishedYear": 2006,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Most deals are won or lost before anyone sits down at the conference table. 3-D Negotiation reveals how to bypass face-to-face deadlocks by reshaping the parties, incentives, and structural architecture of the deal itself.",
      "coreThesis": "Great dealmakers do not rely on interpersonal persuasion at the table; they engineer structural leverage and joint value away from the table so that agreement becomes the natural, inevitable outcome.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "3-D Negotiation: Powerful Tools to Change the Game in Your Most Important Deals"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "a-comparative-study-of-the-majjhima-nikaya-volume-1",
    "title": "A Comparative Study of the Majjhima-nikaya (Volume 1)",
    "author": "Bhikkhu Analayo",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2011,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "By placing ancient parallel scriptures side-by-side like synchronized flight recorders, this investigation strips away centuries of sectarian dust to reveal the clean, universal mechanics of human mental liberation.",
      "coreThesis": "Cross-referencing early textual traditions reveals that liberating insight is not an exclusive sectarian creed, but a universal, empirical protocol for halting self-reinforcing cognitive loops.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "A Comparative Study of the Majjhima-nikaya (Volume 1)"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "a-comparative-study-of-the-majjhima-nikaya-volume-2",
    "title": "A Comparative Study of the Majjhima-nikaya (Volume 2)",
    "author": "Bhikkhu Analayo",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2011,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Imagine holding two distinct flight-recorder black boxes from different airlines that witnessed the exact same historical events. Bhikkhu An\\u0101layo cross-examines ancient Pali and Chinese records to reveal the core cognitive mechanics of mindfulness beneath centuries of cultural paint.",
      "coreThesis": "Authentic spiritual awakening is an empirical, cross-cultural science of mind: by stripping away historical transmission drift, the core teachings reveal a universal, practical technology for debugging sensory reactivity and realizing baseline mental freedom.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "A Comparative Study of the Majjhima-nikaya (Volume 2)"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "a-comprehensive-manual-of-abhidhamma",
    "title": "A Comprehensive Manual of Abhidhamma",
    "author": "Bhikkhu Bodhi",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1993,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your mind is not a single, solid self; it is a rapid stream of micro-moments that can be understood, cleaned, and liberated. This book provides the ultimate high-definition blueprint of human consciousness to dissolve suffering directly at its roots.",
      "coreThesis": "Suffering arises because we mistake a rapid flow of conditioned mind-moments for an enduring self; dismantling experience into its ultimate mental and physical components unlocks authentic spiritual freedom.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "A Comprehensive Manual of Abhidhamma"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "a-concise-introduction-to-logic",
    "title": "A Concise Introduction to Logic",
    "author": "Patrick J. Hurley & Lori Watson",
    "category": "Creativity & Expression",
    "subcategory": "Logic, Rhetoric & Argument",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/364654-M.jpg",
    "readingTimeMinutes": 70,
    "publishedYear": 1982,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Think of human thought as an engine: informal fallacies clog the fuel lines, while formal logic provides the exact structural blueprint that guarantees the machine runs without seizing. Patrick Hurley and Lori Watson turn reasoning from a messy intuitive art into a crisp, observable science of truth.",
      "coreThesis": "An argument is a physical structure governed by exact mechanical laws: if its foundation premises are true and its deductive geometry is valid, its conclusion is as unbreakable as gravity.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "A Concise Introduction to Logic"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "a-discourse-on-the-cula-vedalla-sutta",
    "title": "A Discourse on the Cula-Vedalla Sutta",
    "author": "Mahasi Sayadaw",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 125,
    "publishedYear": 1981,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop fighting the turbulent weather of your thoughts and discover the calm observer underneath. Through an intimate ancient dialogue, this practical manual shows how observing your sensations without grabbing or pushing them away dismantles anxiety and reveals natural inner peace.",
      "coreThesis": "Suffering is not caused by the natural flow of experiences, but by the friction of clinging to them as a fixed 'I.' When you observe sensations with lucid, non-reactive mindfulness, the illusion of an isolated ego dissolves into peaceful freedom.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "A Discourse on the Cula-Vedalla Sutta"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "a-discourse-on-the-maha-vedalla-sutta",
    "title": "A Discourse on the Maha-Vedalla Sutta",
    "author": "Mahasi Sayadaw",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1981,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Step out of the tangled web of mental reactivity and experience the direct, unshakeable stillness of pure awareness. This masterwork unpacks the architecture of your own mind so you can systematically dissolve stress at its root.",
      "coreThesis": "Suffering occurs when you mistake passing mental impressions for a solid self; true peace arises the moment you observe these phenomena as impermanent, impersonal processes.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "A Discourse on the Maha-Vedalla Sutta"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "a-discourse-on-the-sakkapanha-sutta",
    "title": "A Discourse on the Sakkapanha Sutta",
    "author": "Mahasi Sayadaw",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 50,
    "publishedYear": 1980,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Why do beings who yearn for peace remain perpetually at war with themselves and the world? Mahasi Sayadaw unpicks the Buddha's dialogue with the king of gods to reveal how bare, momentary mindfulness dismantles emotional conflict at its very root.",
      "coreThesis": "Hostility, anxiety, and conflict do not stem from the outside world, but from the chain reaction of sensory craving, envy, and conceptual proliferation\\u2014a cycle that dissolves entirely through immediate, non-judgmental mindfulness.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "A Discourse on the Sakkapanha Sutta"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "a-life-of-blessing-celebrating-virtue-and-stillness",
    "title": "A Life of Blessing: Celebrating Virtue and Stillness",
    "author": "Ajahn Pasanno",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 50,
    "publishedYear": 2013,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop chasing external luck and discover how genuine blessing is an inside job built through conscious virtue and serene inner stillness.",
      "coreThesis": "True blessing is not an external windfall granted by chance, but the natural fruit of cultivating ethical clarity, open generosity, and deep contemplative stillness.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "A Life of Blessing: Celebrating Virtue and Stillness"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "a-million-miles-in-a-thousand-years",
    "title": "A Million Miles in a Thousand Years",
    "author": "Donald Miller",
    "category": "Personal Growth",
    "subcategory": "Purpose & Meaning",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/6287866-M.jpg",
    "readingTimeMinutes": 165,
    "publishedYear": 2009,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "When filmmakers set out to turn Donald Miller's memoir into a movie, they exposed an uncomfortable truth: real life was too comfortable, passive, and dull for the screen. By learning the fundamental architecture of storytelling, Miller discovered how anyone can edit their habits, embrace productive conflict, and author a life of quiet nobility and lasting meaning.",
      "coreThesis": "A life acquires profound meaning only when an individual desires something noble, embraces necessary conflict, and allows the struggle to transform their character.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "A Million Miles in a Thousand Years"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "a-mind-for-numbers",
    "title": "A Mind for Numbers",
    "author": "Barbara Oakley",
    "category": "Productivity",
    "subcategory": "Speed Reading & Learning",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8352403-M.jpg",
    "readingTimeMinutes": 90,
    "publishedYear": 2014,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your brain operates two distinct mental operating systems: a narrow spotlight and a wide-angle lens. Learning isn't about raw intellectual horsepower, but knowing when to switch the gears.",
      "coreThesis": "True intellectual mastery comes from toggling between focused and diffuse mental modes while compressing core ideas into modular neural chunks.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "A Mind for Numbers"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "a-simple-way-the-heart-of-the-practice",
    "title": "A Simple Way: The Heart of the Practice",
    "author": "Ajahn Munindo",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2004,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop treating spiritual freedom like a distant promotion you must exhaust yourself to earn. True peace is the ground beneath your feet the instant you stop fighting your immediate experience.",
      "coreThesis": "Suffering dissolves not when we successfully control our circumstances, but when we drop our resistance and rest in the clear, compassionate awareness of things as they actually are.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "A Simple Way: The Heart of the Practice"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "a-still-forest-pool-insight-meditation-of-achaan-chah",
    "title": "A Still Forest Pool: Insight Meditation of Achaan Chah",
    "author": "Ajahn Chah (Jack Kornfield & Paul Breiter eds.)",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1985,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your mind is like a wild forest pool: when you stop churning the water with desires and complaints, the sediment settles on its own, and the clearest truths of life reflect effortlessly on the surface. Ajahn Chah strips spirituality of scholastic mysticism to deliver a radically down-to-earth manual for living free from anxiety and emotional entanglement.",
      "coreThesis": "Suffering is born entirely from grasping what cannot be kept and resisting what cannot be prevented; true peace is not the absence of disturbance, but non-clinging awareness in the midst of it all.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "A Still Forest Pool: Insight Meditation of Achaan Chah"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "a-taste-of-freedom",
    "title": "A Taste of Freedom",
    "author": "Ajahn Chah",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1980,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop fighting the waves of life and step back onto the dry ground of pure awareness. Ajahn Chah strips spiritual practice of all mystical jargon, offering an earthy, razor-sharp blueprint for tasting total inner freedom right here, right now.",
      "coreThesis": "Suffering is not caused by the transient world, but by our grasping onto what cannot stay; letting go completely brings unshakeable, immediate peace.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "A Taste of Freedom"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "a-theory-of-cognitive-dissonance",
    "title": "A Theory of Cognitive Dissonance",
    "author": "Leon Festinger",
    "category": "Psychology",
    "subcategory": "Social Psychology",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/5291092-M.jpg",
    "readingTimeMinutes": 55,
    "publishedYear": 1957,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your brain hates holding two conflicting truths just like your body hates physical hunger. Leon Festinger reveals the hidden psychological engine that forces us to bend reality, justify bad choices, and rewrite our beliefs just to protect our peace of mind.",
      "coreThesis": "Mental contradiction creates an unbearable psychological tension that compels people to distort their beliefs, hunt for confirmation, and rewrite history just to make their choices feel right.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "A Theory of Cognitive Dissonance"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "abundant-exalted-immeasurable-the-brahmaviharas",
    "title": "Abundant, Exalted, Immeasurable: The Brahmaviharas",
    "author": "Ajahn Pasanno",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 90,
    "publishedYear": 2016,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your heart is not a fragile room to be defended, but an boundless atmosphere waiting to be uncovered. Ajahn Pasanno reveals how the Brahmaviharas transform loving-kindness, compassion, appreciative joy, and equanimity from fragile emotions into an unshakeable vehicle for direct awakening.",
      "coreThesis": "The heart's natural state is boundless and hospitable; by training the mind to abandon defensive contraction and radiate unconditional goodwill, the Brahmaviharas become direct vehicles for complete spiritual liberation.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Abundant, Exalted, Immeasurable: The Brahmaviharas"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "algorithms-to-live-by",
    "title": "Algorithms to Live By",
    "author": "Brian Christian & Tom Griffiths",
    "category": "Psychology",
    "subcategory": "Decision Making",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8042539-M.jpg",
    "readingTimeMinutes": 55,
    "publishedYear": 2016,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Computer science is not just for silicon chips; it is the hidden arithmetic of human sanity. Discover how classic computational trade-offs can elegantly untangle your toughest everyday dilemmas.",
      "coreThesis": "Human struggles with time and choices are fundamental resource allocation dilemmas. Applying computational strategies transforms everyday anxiety into elegant, mathematically sound decisions.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Algorithms to Live By"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "alone-together-why-we-expect-more-from-technology-and-less-f",
    "title": "Alone Together: Why We Expect More from Technology and Less from Each Other",
    "author": "Sherry Turkle",
    "category": "Communication",
    "subcategory": "Remote & Digital Communication",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/6952623-M.jpg",
    "readingTimeMinutes": 70,
    "publishedYear": 2011,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "We demand more from technology and less from each other, trading messy human intimacy for frictionless digital control. This book pulls back the curtain on how constant connectivity leaves us hyper-networked yet profoundly isolated.",
      "coreThesis": "Digital hyper-connectivity creates a false illusion of community that actually starves us of real intimacy and deep solitude.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Alone Together: Why We Expect More from Technology and Less from Each Other"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "an-illustrated-book-of-bad-arguments",
    "title": "An Illustrated Book of Bad Arguments",
    "author": "Ali Almossawi",
    "category": "Creativity & Expression",
    "subcategory": "Logic, Rhetoric & Argument",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/9352570-M.jpg",
    "readingTimeMinutes": 95,
    "publishedYear": 2013,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Every day, flawed arguments masquerade as ironclad logic by exploiting blind spots in human wiring. This visual field guide exposes the 19 most common reasoning traps, giving you an x-ray lens to diagnose rhetorical sleight of hand in real time.",
      "coreThesis": "An argument's validity depends strictly on its logical architecture and empirical foundations, never on rhetorical volume, emotional threats, or the personality of the speaker.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "An Illustrated Book of Bad Arguments"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "an-inquiring-mind-s-journey-into-vipassana",
    "title": "An Inquiring Mind's Journey into Vipassana",
    "author": "Sayadaw U Dhammarakkhita",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 60,
    "publishedYear": 2008,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop fighting the turbulent currents of your thoughts and step onto the dry riverbank of direct observation. This book provides a master craftsman's blueprint for dismantling everyday anxiety, uncovering natural inner stillness, and discovering freedom right in the middle of life's daily demands.",
      "coreThesis": "Suffering is born from mistaking transient mental and physical events for a permanent self; meticulous, non-reactive observation systematically dissolves this confusion, unveiling natural, unconditioned peace.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "An Inquiring Mind's Journey into Vipassana"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "an-introduction-to-reasoning",
    "title": "An Introduction to Reasoning",
    "author": "Stephen Toulmin, Richard Rieke, Allan Janik",
    "category": "Creativity & Expression",
    "subcategory": "Logic, Rhetoric & Argument",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/14838-M.jpg",
    "readingTimeMinutes": 120,
    "publishedYear": 1979,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Step into the engine room of human decision-making: discover how everyday arguments really function as living, load-bearing mechanical bridges rather than sterile textbook equations. Toulmin, Rieke, and Janik crack open the hidden anatomy of persuasion to show how evidence transforms into sound judgment.",
      "coreThesis": "Human reasoning is a practical diagnostic craft rather than an idealized mathematical calculation: every robust argument functions like a well-engineered bridge whose structural soundness depends on anchoring concrete facts to validated principles while transparently mapping its own operational limits.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "An Introduction to Reasoning"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "anatta-and-nibbana-egolessness-and-deliverance",
    "title": "Anatta and Nibbana: Egolessness and Deliverance",
    "author": "Nyanaponika Thera",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1959,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop searching for an eternal self to polish or fearing an empty void to avoid; true freedom begins the exact second you see that you were never a solid, trapped identity to begin with.",
      "coreThesis": "Liberation is not the destruction of a real self nor the discovery of an eternal soul; it is the immediate peace of dropping a phantom burden you never actually had to carry.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Anatta and Nibbana: Egolessness and Deliverance"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "anger-wisdom-for-cooling-the-flames",
    "title": "Anger: Wisdom for Cooling the Flames",
    "author": "Thich Nhat Hanh",
    "category": "Psychology",
    "subcategory": "Mental Health & Healing",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/824062-M.jpg",
    "readingTimeMinutes": 55,
    "publishedYear": 2001,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Anger is not a character flaw or a beast to cage; it is a sensitive dashboard warning light signaling an internal emergency. Discover how to treat emotional flare-ups like kitchen grease fires\\u2014cooling the heat instantly with breath and compost rather than fueling the blaze.",
      "coreThesis": "Anger is an internal fire fueled by distorted perception and unaddressed suffering; cooling it requires soothing your own biological storm first before attempting to fix the relationship.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Anger: Wisdom for Cooling the Flames"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "antifragile-things-that-gain-from-disorder",
    "title": "Antifragile: Things That Gain from Disorder",
    "author": "Nassim Nicholas Taleb",
    "category": "Personal Growth",
    "subcategory": "Resilience & Mental Toughness",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/9180157-M.jpg",
    "readingTimeMinutes": 125,
    "publishedYear": 2012,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Some things shatter under pressure, but living systems actually grow stronger from shocks. Discover the hidden mechanical law that turns chaos, stress, and volatility into your greatest fuel.",
      "coreThesis": "Wind extinguishes a delicate candle but energizes a roaring wildfire. Structure your life and systems so you gain from unexpected disorder instead of hiding from it.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Antifragile: Things That Gain from Disorder"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "arahattamagga-arahattaphala-the-path-to-arahantship",
    "title": "Arahattamagga Arahattaphala: The Path to Arahantship",
    "author": "Ajahn Maha Bua",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2005,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "A rare, uncompromising firsthand account of full spiritual liberation from one of the Thai Forest Tradition's most revered masters. It delivers a direct, surgical roadmap to dismantling ego and discovering unshakeable inner freedom.",
      "coreThesis": "Suffering ends not through philosophical belief, but through the uncompromising investigation of the mind that dissolves the mistaken illusion of a separate self.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Arahattamagga Arahattaphala: The Path to Arahantship"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "argumentation-and-debate-critical-thinking-for-reasoned-deci",
    "title": "Argumentation and Debate: Critical Thinking for Reasoned Decision Making",
    "author": "Austin J. Freeley & David L. Steinberg",
    "category": "Creativity & Expression",
    "subcategory": "Logic, Rhetoric & Argument",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/364188-M.jpg",
    "readingTimeMinutes": 95,
    "publishedYear": 2014,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Decisions made on gut feel or charisma are reckless gambles when the stakes are high. Freeley and Steinberg deliver a masterclass in dialectical architecture, arming you to pressure-test every proposition, expose hidden structural flaws in competing arguments, and execute decisions that withstand ruthless scrutiny.",
      "coreThesis": "Reasoned decision-making is an objective risk-management system where every claim must survive rigorous evidentiary audits, structural validation, and adversarial refutation before capital or credibility is committed.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Argumentation and Debate: Critical Thinking for Reasoned Decision Making"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "atomic-habits",
    "title": "Atomic Habits",
    "author": "James Clear",
    "category": "Productivity",
    "subcategory": "Habits & Routines",
    "coverColor": "from-amber-500 to-red-600",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/12539702-M.jpg",
    "readingTimeMinutes": 100,
    "publishedYear": 2018,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Transform your life not by overhauling your goals, but by engineering tiny, effortless daily systems that compound into massive results. You do not rise to the level of your ambitions; you fall to the level of your systems.",
      "coreThesis": "You do not rise to the level of your goals; you fall to the level of your systems. Tiny atomic habits compound over time into life-changing identity shifts.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Atomic Habits"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Core Insights"
    ]
  },
  {
    "id": "attacking-faulty-reasoning",
    "title": "Attacking Faulty Reasoning",
    "author": "T. Edward Damer",
    "category": "Creativity & Expression",
    "subcategory": "Logic, Rhetoric & Argument",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/4665842-M.jpg",
    "readingTimeMinutes": 50,
    "publishedYear": 1980,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Think of human communication as an intricate bridge: if any support beam is cracked or unanchored, the entire crossing collapses under pressure. T. Edward Damer provides a diagnostic blueprint to spot structural flaws in everyday reasoning and neutralize deceptive debate tactics in real time.",
      "coreThesis": "A reliable argument functions like a well-engineered load-bearing arch: it stands only when its premises meet five strict standards\\u2014sound structure, undeniable relevance, credible acceptability, adequate sufficiency, and proactive rebuttal of counterevidence.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Attacking Faulty Reasoning"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "attention-span",
    "title": "Attention Span",
    "author": "Gloria Mark",
    "category": "Productivity",
    "subcategory": "Focus & Deep Work",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/13151982-M.jpg",
    "readingTimeMinutes": 70,
    "publishedYear": 2023,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Dr. Gloria Mark debunks the toxic myth of unbroken eight-hour focus, revealing how your mind's natural attentional rhythms ebb and flow across screens. By viewing attention as a replenishable mental battery rather than an engine that can redline without stopping, you can eliminate digital exhaustion and master your daily cognitive energy.",
      "coreThesis": "Human attention is a finite, rhythmic cognitive resource that naturally fluctuates; sustainable productivity and mental well-being come not from forcing continuous focus, but from synchronizing demanding tasks with natural cognitive rhythms and restorative balance.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Attention Span"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "awareness-alone-is-not-enough",
    "title": "Awareness Alone Is Not Enough",
    "author": "Sayadaw U Tejaniya",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2008,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Mindfulness without wisdom is merely passive recording. True freedom comes when you check the quality of your observing mind and investigate experience with relaxed curiosity.",
      "coreThesis": "Awareness alone cannot liberate the mind; genuine freedom arises only when awareness is paired with right attitude and wisdom that observes without craving, aversion, or personal ownership.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Awareness Alone Is Not Enough"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "bargaining-for-advantage-negotiation-strategies-for-reasonab",
    "title": "Bargaining for Advantage: Negotiation Strategies for Reasonable People",
    "author": "G. Richard Shell",
    "category": "Sales & Persuasion",
    "subcategory": "Persuasion & Influence",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/402203-M.jpg",
    "readingTimeMinutes": 60,
    "publishedYear": 1999,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Negotiation is not a bare-knuckle brawl; it is an information-gathering science governed by predictable human dynamics. By aligning your personal style with situational leverage and objective standards, you can secure phenomenal outcomes without sacrificing your ethics.",
      "coreThesis": "Effective negotiation is a disciplined process of information discovery, where genuine leverage flows from matching your personal style to objective standards and the other party's hidden priorities.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Bargaining for Advantage: Negotiation Strategies for Reasonable People"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "becoming-a-supple-leopard",
    "title": "Becoming a Supple Leopard",
    "author": "Kelly Starrett & Glen Cordoza",
    "category": "Health & Longevity",
    "subcategory": "Fitness & Strength",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/7318487-M.jpg",
    "readingTimeMinutes": 55,
    "publishedYear": 2013,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your body is a finely engineered chassis designed for effortless, pain-free performance if you respect its mechanical tolerances. Starrett and Cordoza reveal how small daily habits and simple self-maintenance tools restore supple, lifelong athleticism.",
      "coreThesis": "Human pain and athletic breakdown stem from poor movement mechanics and neglected soft tissue, both of which can be permanently self-corrected through spinal bracing, rotational torque, and daily physical maintenance.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Becoming a Supple Leopard"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Finance",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "being-dharma-the-essence-of-the-buddha-s-teachings",
    "title": "Being Dharma: The Essence of the Buddha's Teachings",
    "author": "Ajahn Chah",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2001,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop chasing peace as an external trophy and learn to settle the mind right where you stand. Ajahn Chah strips away mystical jargon to reveal that true freedom is simply letting go of what you cannot control.",
      "coreThesis": "Suffering is born from holding onto impermanent things; freedom is the natural ease that occurs when you open your hand and let things be as they are.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Being Dharma: The Essence of the Buddha's Teachings"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "being-logical-a-guide-to-good-thinking",
    "title": "Being Logical: A Guide to Good Thinking",
    "author": "D.Q. McInerny",
    "category": "Creativity & Expression",
    "subcategory": "Logic, Rhetoric & Argument",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/746332-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2004,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Logic is not dry math or ivory-tower theory; it is the invisible physics of clear thinking. Learn how everyday thoughts either lock cleanly into reality or wobble and collapse like an uneven kitchen table.",
      "coreThesis": "Logic is the practical art of aligning human thought with objective reality so our conclusions remain structurally sound, truthful, and clear.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Being Logical: A Guide to Good Thinking"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "better-than-before",
    "title": "Better Than Before",
    "author": "Gretchen Rubin",
    "category": "Productivity",
    "subcategory": "Habits & Routines",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/12709821-M.jpg",
    "readingTimeMinutes": 105,
    "publishedYear": 2015,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Human behavior fails not from a lack of willpower, but from flawed system design and misdiagnosed cognitive wiring. By understanding your psychological response to expectations and eliminating friction, you can automate habits without exhausting mental fuel.",
      "coreThesis": "Sustainable habits are not forged through raw willpower, but engineered by aligning daily routines with your innate cognitive temperament to eliminate in-the-moment decision-making.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Better Than Before"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "beyond-all-directions-essays-on-nirvana",
    "title": "Beyond All Directions: Essays on Nirvana",
    "author": "Thanissaro Bhikkhu",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2013,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop searching for enlightenment in mystical slogans; genuine freedom is an exacting craft of mindful discernment. Thanissaro Bhikkhu cuts through modern spiritual romance to reveal Nirvana as the unconditioned peace that emerges when mental fabrications are clearly understood and put down.",
      "coreThesis": "Nirvana is not an emotional mood or a cosmic location, but the radical unbinding that occurs when the mind masters discernment, drops all fabricated identities, and steps outside the cycle of craving.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Beyond All Directions: Essays on Nirvana"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "bhavana-mind-development-in-everyday-reality",
    "title": "Bhavana: Mind Development in Everyday Reality",
    "author": "Chanmyay Sayadaw (U Janakabhivamsa)",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1999,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Meditation is not a mystical retreat from life, but the direct mental calibration required to navigate daily existence without being hijacked by stress, reactivity, and fear. Chanmyay Sayadaw provides a crystal-clear masterclass on turning every breath, step, and sensation into an instrument of profound liberation.",
      "coreThesis": "Suffering arises because we unconsciously identify with transient sensations and thoughts; by maintaining uninterrupted, objective awareness through mental noting in all daily activities, the illusion of ego dissolves into liberating clarity.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Bhavana: Mind Development in Everyday Reality"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "blink-the-power-of-thinking-without-thinking",
    "title": "Blink: The Power of Thinking Without Thinking",
    "author": "Malcolm Gladwell",
    "category": "Psychology",
    "subcategory": "Decision Making",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/14421850-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2005,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Great decisions do not require endless data; they require protecting your subconscious radar from noise. Master the two-second window where instinct either outsmarts analysis or walks into a trap.",
      "coreThesis": "Split-second intuitive judgment can outperform months of formal analysis, but only when protected from ambient bias, sensory overload, and overthinking.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Blink: The Power of Thinking Without Thinking"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "bodhinyana-a-collection-of-dhamma-talks",
    "title": "Bodhinyana: A Collection of Dhamma Talks",
    "author": "Ajahn Chah",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1982,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Peace is not the absence of life's storms; it is the wisdom to stop wrestling with them. Ajahn Chah strips away mystical jargon to reveal how everyday awareness and radical non-clinging dismantle anxiety at the root.",
      "coreThesis": "Suffering is caused solely by clinging to things that naturally change; true peace is realized the moment we stop demanding the world be anything other than what it is.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Bodhinyana: A Collection of Dhamma Talks"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "bored-and-brilliant",
    "title": "Bored and Brilliant",
    "author": "Manoush Zomorodi",
    "category": "Productivity",
    "subcategory": "Focus & Deep Work",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10142388-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2017,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "When you eliminate every second of downtime with a smartphone screen, you starve your brain of the exact neural state required to solve hard problems. Boredom is not dead time; it is the incubation chamber where your mind connects disparate dots into brilliant ideas.",
      "coreThesis": "Boredom is not an emotional defect to be medicated with pixels, but a vital biological trigger that launches constructive mind-wandering and creative synthesis.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Bored and Brilliant"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "born-to-run",
    "title": "Born to Run",
    "author": "Christopher McDougall",
    "category": "Health & Longevity",
    "subcategory": "Fitness & Strength",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8473368-M.jpg",
    "readingTimeMinutes": 160,
    "publishedYear": 2009,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Humans didn't evolve to sit behind desks or nurse blown-out knees\\u2014our anatomy is nature\\u2019s supreme long-distance hunting machine. By decoding the reclusive Tarahumara runners and stripped-down biomechanics, this book reveals how rediscovering natural movement turns running from a punishing chore into effortless vitality.",
      "coreThesis": "Humans are evolutionary endurance athletes engineered to run long distances with light, injury-free mechanics, and unlocking that stamina requires stripping away artificial shoe cushioning and reclaiming relaxed, joyful movement.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Born to Run"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Finance",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "boundaries-when-to-say-yes-how-to-say-no-to-take-control-of-",
    "title": "Boundaries: When to Say Yes, How to Say No to Take Control of Your Life",
    "author": "Henry Cloud & John Townsend",
    "category": "Communication",
    "subcategory": "Boundaries & Assertiveness",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8227168-M.jpg",
    "readingTimeMinutes": 80,
    "publishedYear": 1992,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Just like a house needs walls and a property fence to keep out weeds while letting in sunlight, human beings require clear structural perimeters to thrive. This book reverse-engineers the psychological architecture of saying 'no' without guilt, revealing why clear limits are the foundation of genuine connection and freedom.",
      "coreThesis": "You are entirely responsible for what lives inside your psychological perimeter and not responsible for what belongs outside it; clarifying this property line is the prerequisite for authentic love and personal freedom.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Boundaries: When to Say Yes, How to Say No to Take Control of Your Life"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "brahmavihara-the-four-immeasurables-in-early-buddhism",
    "title": "Brahmavihara: The Four Immeasurables in Early Buddhism",
    "author": "Bhikkhu Analayo",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2015,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "What if your hardest emotional friction could be dissolved using the exact same systems thinking behind field mechanics and open space? Bhikkhu Analayo reveals early Buddhism's master circuit: pairing boundless emotional resonance with radical cognitive openness to build an unshakeable, frictionless operating system.",
      "coreThesis": "Boundless goodwill and structural emptiness are complementary control systems: radiating immeasurable care prevents emptiness from turning cold, while realizing emptiness keeps boundless care completely free from burnout and grasping.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Brahmavihara: The Four Immeasurables in Early Buddhism"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "breakthrough-realizing-the-deathless-in-this-life",
    "title": "Breakthrough: Realizing the Deathless in This Life",
    "author": "Ajahn Amaro",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 55,
    "publishedYear": 2017,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Liberation is not an exotic future achievement\\u2014it is an immediate shift in perspective right where you sit. Ajahn Amaro unpacks the classic breakthrough of stream-entry, showing how to step out of mental turbulence and discover the unshakable, deathless nature of pure awareness.",
      "coreThesis": "The deathless is not a distant celestial prize, but the unconditioned space of awareness already present behind all experience, uncovered the moment we stop clinging to transient identities.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Breakthrough: Realizing the Deathless in This Life"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "breath-the-new-science-of-a-lost-art",
    "title": "Breath: The New Science of a Lost Art",
    "author": "James Nestor",
    "category": "Health & Longevity",
    "subcategory": "Breathwork & Somatics",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10096454-M.jpg",
    "readingTimeMinutes": 50,
    "publishedYear": 2020,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Humans have forgotten how to breathe properly, triggering a cascade of modern chronic ailments from sleep apnea to anxiety. By reclaiming simple, evolutionary breathing habits, anyone can transform their physical endurance, mental clarity, and longevity in minutes a day.",
      "coreThesis": "How we breathe matters just as much as what we eat or how much we exercise, and switching to slow, light nasal breathing is the single most accessible biological upgrade available to modern humans.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Breath: The New Science of a Lost Art"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Finance",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "breathing-like-a-buddha",
    "title": "Breathing Like a Buddha",
    "author": "Ajahn Sucitto",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 100,
    "publishedYear": 2022,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Meditation is not an uphill fight to pin down a wandering mind; it is coming home to the natural rhythm that already sustains your life. Ajahn Sucitto restores the Buddha's breath meditation to what it was always meant to be: an embodied, somatic journey from tension to liberation.",
      "coreThesis": "Liberation does not come from controlling your mind through force, but from inhabiting your body with kind awareness\\u2014allowing the natural breath-energy to dissolve contractions until heart and world rest in unclenched peace.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Breathing Like a Buddha"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "broad-view-boundless-heart",
    "title": "Broad View, Boundless Heart",
    "author": "Ajahn Pasanno & Ajahn Amaro",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2001,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Wisdom without heart turns cold and sterile, while compassion without clear sight collapses into exhausted burnout. This book unites deep meditative serenity with fierce emotional warmth, teaching you how to dwell in open awareness without clinging to a single conditioned thought.",
      "coreThesis": "Genuine spiritual freedom arises from the seamless union of radical mental openness and unconditional benevolence: seeing things as they actually are without grasping, and meeting every experience with an undefended heart.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Broad View, Boundless Heart"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "buddhism-and-the-ecology-of-mind",
    "title": "Buddhism and the Ecology of Mind",
    "author": "Bhikkhu Bodhi",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1990,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "When a river fills with sludge, looking only at the water never cures the problem\\u2014you have to inspect the factory upstream. Bhikkhu Bodhi shows that our burning planet is merely the outward symptom of an untended, toxic mind, offering a serene, practical path to purify consciousness and heal our shared world.",
      "coreThesis": "Our environmental collapse is the outward shadow cast by an uncultivated mind gripped by greed and separation; purifying inner awareness through contentment and interconnected wisdom naturally restores outer balance.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Buddhism and the Ecology of Mind"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "buddhism-and-the-god-idea",
    "title": "Buddhism and the God-Idea",
    "author": "Nyanaponika Thera",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1962,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Step off the treadmill of seeking salvation outside yourself. Nyanaponika Thera offers a serene, razor-sharp look into how awakening is not found in an external creator, but realized right here in the uncluttered clarity of your own direct awareness.",
      "coreThesis": "Genuine liberation requires no external creator: the universe operates by lawful cause and effect, and true peace is realized only through personal responsibility and direct mindful insight.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Buddhism and the God-Idea"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "building-a-second-brain",
    "title": "Building a Second Brain",
    "author": "Tiago Forte",
    "category": "Productivity",
    "subcategory": "Daily Systems & Workflows",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/12372866-M.jpg",
    "readingTimeMinutes": 50,
    "publishedYear": 2022,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your mind is a brilliant engine for having ideas, not a dusty warehouse for storing them. Building a Second Brain reveals how to construct an external digital workshop that captures, distills, and synthesizes your knowledge so you can create effortlessly.",
      "coreThesis": "Your brain is designed to generate insights, not hoard information; by systematically capturing and organizing ideas outside your head, you turn passive consumption into high-leverage creative output.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Building a Second Brain"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "built-from-broken",
    "title": "Built from Broken",
    "author": "Scott H. Hogan",
    "category": "Health & Longevity",
    "subcategory": "Fitness & Strength",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/11974382-M.jpg",
    "readingTimeMinutes": 60,
    "publishedYear": 2021,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop treating joint pain like an inevitable mechanical breakdown and start training your connective tissue like the living, adaptable biological network it is. Scott Hogan translates musculoskeletal science into a step-by-step blueprint to rebuild tendons, ligaments, and joint mechanics from the inside out.",
      "coreThesis": "Joint pain is primarily a structural adaptation signal rather than a permanent life sentence; by applying controlled mechanical load, active end-range mobility, and disciplined periodization, you stimulate living collagen networks to remodel and rebuild.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Built from Broken"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Finance",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "bullshit-jobs-on-bullshit",
    "title": "Bullshit Jobs & On Bullshit",
    "author": "Harry Frankfurt",
    "category": "Creativity & Expression",
    "subcategory": "Logic, Rhetoric & Argument",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2005,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Lying is a calculated counterfeit, but bullshit is complete indifference to whether the coin is real at all. Discover the hidden mechanics of discourse where truth is not attacked, but quietly abandoned for optics.",
      "coreThesis": "The liar respects the authority of the truth enough to actively conceal it, whereas the bullshitter is far more corrosive because they disregard the truth entirely to focus solely on impression management.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Bullshit Jobs & On Bullshit"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "cittaviveka-teachings-from-the-silent-mind",
    "title": "Cittaviveka: Teachings from the Silent Mind",
    "author": "Ajahn Sumedho",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 70,
    "publishedYear": 1983,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "You do not need to silence your mind; you only need to step back and realize that your awareness is already silent. Ajahn Sumedho offers a masterclass in shedding emotional clutter and resting in spacious, unshakeable freedom.",
      "coreThesis": "Suffering occurs when we identify with passing thoughts and feelings; genuine liberation is resting as the silent, unconditioned witness that peacefully contains them all.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Cittaviveka: Teachings from the Silent Mind"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "clarity-of-insight-selected-forest-dhamma",
    "title": "Clarity of Insight: Selected Forest Dhamma",
    "author": "Ajahn Chah",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1979,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop wrestling with your restless mind and simply flip on the inner light switch. Ajahn Chah reveals that true freedom comes not from stopping thoughts, but from resting as the silent, unshakeable observer who sees all things rise and fall.",
      "coreThesis": "Suffering occurs only when the mind clings to ever-shifting conditions; by resting in steady, luminous awareness ('the one who knows'), we see through illusions and discover unshakeable inner peace.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Clarity of Insight: Selected Forest Dhamma"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "clear-thinking",
    "title": "Clear Thinking",
    "author": "Shane Parrish",
    "category": "Psychology",
    "subcategory": "Cognitive Biases & Logic",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/15208264-M.jpg",
    "readingTimeMinutes": 130,
    "publishedYear": 2023,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Master the quiet, ordinary moments where destiny is shaped, before mindless reaction steals your peace. True wisdom lies not in sudden brilliance, but in conquering the internal defaults that cloud judgment.",
      "coreThesis": "Extraordinary life outcomes flow from avoiding unforced errors in ordinary moments by mastering automatic defaults. Cultivating stillness between impulse and action preserves reason and protects long-term peace.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Clear Thinking"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "cognitive-psychology-mind-and-brain",
    "title": "Cognitive Psychology: Mind and Brain",
    "author": "Edward E. Smith & Stephen M. Kosslyn",
    "category": "Psychology",
    "subcategory": "Human Behavior",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/88240-M.jpg",
    "readingTimeMinutes": 60,
    "publishedYear": 2006,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your mind is not a mysterious ghost in a machine; it is a masterfully integrated information engine running on specialized biological circuits. Smith and Kosslyn reveal the secret neural gears behind everyday attention, memory, and choices, showing how your physical brain constructs your lived reality.",
      "coreThesis": "The mind is the functional output of localized, collaborative neural networks that filter sensory chaos, manipulate representations on a limited workbench, and direct purposeful behavior.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Cognitive Psychology: Mind and Brain"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "compassion-and-emptiness-in-early-buddhist-meditation",
    "title": "Compassion and Emptiness in Early Buddhist Meditation",
    "author": "Bhikkhu Analayo",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2015,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "What if boundless empathy and radical detachment are not opposites, but the two wings of a single aerodynamic glider? This guide maps the underlying neural and mental architecture that turns boundless warmth into the ultimate gateway to inner freedom.",
      "coreThesis": "Compassion expands the emotional boundaries of the heart to infinity, while emptiness systematically dissolves the illusion of an isolated self, unlocking profound freedom without emotional numbness.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Compassion and Emptiness in Early Buddhist Meditation"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "complexity-a-guided-tour",
    "title": "Complexity: A Guided Tour",
    "author": "Melanie Mitchell",
    "category": "Psychology",
    "subcategory": "Human Behavior",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/6378519-M.jpg",
    "readingTimeMinutes": 95,
    "publishedYear": 2009,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Step behind the curtain of reality to discover how mindless individual parts spontaneously self-organize into brilliant, living wholes. Melanie Mitchell illuminates the hidden software driving ant colonies, immune systems, brain networks, and chaotic markets without anyone in charge.",
      "coreThesis": "Profound order, adaptation, and intelligence arise spontaneously from the interactions of decentralized parts governed by simple local rules, rendering linear reductionism obsolete.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Complexity: A Guided Tour"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "connecting-across-differences",
    "title": "Connecting Across Differences",
    "author": "Jane Marantz Connor & Dian Killian",
    "category": "Communication",
    "subcategory": "Active Listening & Empathy",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 50,
    "publishedYear": 2012,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Human conflict is rarely a clash of incompatible values; it is an engineering breakdown caused by confusing diagnostic judgments with vital underlying needs. By treating communication like a precision feedback system, this book shows how anyone can de-escalate volatile disputes and establish immediate, genuine alignment.",
      "coreThesis": "All human conflict stems from expressing unmet universal needs through moralistic judgment; resolving discord requires systematically decoding surface hostility into shared human requirements and concrete, collaborative actions.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Connecting Across Differences"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "contagious-why-things-catch-on",
    "title": "Contagious: Why Things Catch On",
    "author": "Jonah Berger",
    "category": "Sales & Persuasion",
    "subcategory": "Persuasion & Influence",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/9039370-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2013,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Things don't catch on by random luck or massive ad budgets; they spread because they tap into basic human social wiring. Virality isn't magic\\u2014it's a predictable craft anyone can engineer.",
      "coreThesis": "Ideas and products spread virally not by chance, but when they deliver social prestige, connect to frequent daily cues, trigger high arousal, and travel inside useful stories.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Contagious: Why Things Catch On"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "contemplation-of-dhamma-the-fourth-foundation",
    "title": "Contemplation of Dhamma: The Fourth Foundation",
    "author": "Bhikkhu Analayo",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 65,
    "publishedYear": 2003,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Mindfulness is not a vague relaxation exercise; it is high-resolution cognitive reverse-engineering. Bhikkhu An\\u0101layo pulls back the curtain on the fourth foundation of mindfulness, revealing how your mind's internal operating system constructs reality and how you can systematically dismantle suffering.",
      "coreThesis": "Suffering is not an inherent flaw in human consciousness, but the predictable output of unexamined causal feedback loops. When you observe your experience through structured principles rather than personal drama, psychological bondage dissolves into clear, non-reactive freedom.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Contemplation of Dhamma: The Fourth Foundation"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "continuous-mindfulness-in-dynamic-living",
    "title": "Continuous Mindfulness in Dynamic Living",
    "author": "Sayadaw U Ottamathara",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2014,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Meditation is not an escape hatch from modern life; it is the clear lens through which life is lived. Sayadaw U Ottamathara dismantles the boundary between formal sitting and daily chaos, showing how unbroken awareness turns every chore, interaction, and obstacle into effortless liberation.",
      "coreThesis": "Suffering dissolves when awareness ceases to be a scheduled appointment and becomes an uninterrupted way of engaging with life's dynamic movement.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Continuous Mindfulness in Dynamic Living"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "conversational-intelligence-how-great-leaders-build-trust-an",
    "title": "Conversational Intelligence: How Great Leaders Build Trust and Get Extraordinary Results",
    "author": "Judith E. Glaser",
    "category": "Communication",
    "subcategory": "Difficult Conversations",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/12521056-M.jpg",
    "readingTimeMinutes": 60,
    "publishedYear": 2014,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Words do not merely transmit data\\u2014they spark biochemical reactions that either lock our brains down in defensive fear or unlock our prefrontal cortex for brilliant co-creation. Judith E. Glaser reveals the hidden neuroscience of human dialogue and provides the practical tools needed to turn every interaction into a catalyst for extraordinary trust and mutual innovation.",
      "coreThesis": "To get to the next level of greatness depends on the quality of the culture, which depends on the quality of relationships, which depends on the quality of conversations; everything happens through conversation.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Conversational Intelligence: How Great Leaders Build Trust and Get Extraordinary Results"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "crucial-conversations-tools-for-talking-when-stakes-are-high",
    "title": "Crucial Conversations: Tools for Talking When Stakes Are High",
    "author": "Joseph Grenny, Kerry Patterson, Ron McMillan, Al Switzler",
    "category": "Communication",
    "subcategory": "Difficult Conversations",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/1711809-M.jpg",
    "readingTimeMinutes": 60,
    "publishedYear": 2002,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "When stakes climb and emotions flare, human biology defaults to silence or violence. This field manual reveals the hidden physics of high-stakes dialogue, equipping you to turn tense confrontations into breakthrough agreements.",
      "coreThesis": "The success of our careers, health, and relationships hinges on how we handle conversations where opinions differ, stakes are high, and emotions run hot. Psychological safety, not blunt force, is the prerequisite for unlocking honest truth.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Crucial Conversations: Tools for Talking When Stakes Are High"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "curation-the-power-of-selection-in-a-world-of-excess",
    "title": "Curation: The Power of Selection in a World of Excess",
    "author": "Michael Bhaskar",
    "category": "Productivity",
    "subcategory": "Daily Systems & Workflows",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/13324166-M.jpg",
    "readingTimeMinutes": 55,
    "publishedYear": 2016,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "In an economy drowned in infinite supply and negligible reproduction costs, value permanently shifts from making more things to selecting what matters. Curation is not a polite museum term\\u2014it is an aggressive, high-stakes filter that builds defensible competitive moats out of noise.",
      "coreThesis": "When supply is infinite, production ceases to be an advantage. Real economic value and defensible authority migrate entirely to the filter: the disciplined act of selecting, reducing, and arranging inputs to deliver clarity.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Curation: The Power of Selection in a World of Excess"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "dana-the-practice-of-giving",
    "title": "Dana: The Practice of Giving",
    "author": "Bhikkhu Bodhi",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1990,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Generosity is not a financial transaction or moral tax; it is the fundamental art of opening the clenched fist of the ego. By practicing deliberate giving, you systematically dissolve greed, cultivate quiet joy, and build the unshakeable inner freedom required for deep awakening.",
      "coreThesis": "True generosity is the intentional surrender of grasping that frees the mind from self-centered anxiety and establishes the essential foundation for liberation.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Dana: The Practice of Giving"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "daring-greatly",
    "title": "Daring Greatly",
    "author": "Bren\\u00e9 Brown",
    "category": "Psychology",
    "subcategory": "Emotional Intelligence",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/7367250-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2012,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Vulnerability is not weakness\\u2014it is the biological birthplace of innovation, joy, and authentic human connection. Stepping into the arena requires putting down your psychological armor and daring to be seen when outcomes are completely out of your control.",
      "coreThesis": "Vulnerability is not the measure of weakness, but the truest operational measure of human courage and authentic connection.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Daring Greatly"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "daughters-and-sons-buddhist-wisdom-on-parenting",
    "title": "Daughters and Sons: Buddhist Wisdom on Parenting",
    "author": "Ajahn Jayasaro",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2011,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Parenting and filial devotion are not burdens of duty, but sacred training grounds for awakening direct empathy and transcending the ego. Ajahn Jayasaro reveals how honoring our roots becomes the quiet engine of genuine emotional freedom and spiritual maturity.",
      "coreThesis": "True spiritual maturity begins when we step outside self-centered entitlement to recognize the profound sacrifices that gave us life, transforming filial gratitude into an active practice of liberation.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Daughters and Sons: Buddhist Wisdom on Parenting"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "dbt-skills-training-handouts-and-worksheets",
    "title": "DBT Skills Training Handouts and Worksheets",
    "author": "Marsha M. Linehan",
    "category": "Psychology",
    "subcategory": "Human Behavior",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10191535-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2014,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Think of your mind as a high-performance engine that occasionally redlines; this book is the definitive, field-tested owner's manual for diagnosing stalls and regaining full steering control. Instead of vague advice to 'stay calm,' Marsha Linehan provides exact, modular mechanical protocols to navigate high-stakes personal and interpersonal storms.",
      "coreThesis": "Emotional suffering becomes unmanageable only when acute pain is met with behavioral avoidance and denial; by synthesizing radical self-acceptance with structured behavioral skills, you can ride out any emotional surge and build a life worth living.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "DBT Skills Training Handouts and Worksheets"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "decisive",
    "title": "Decisive",
    "author": "Chip Heath & Dan Heath",
    "category": "Psychology",
    "subcategory": "Decision Making",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8537216-M.jpg",
    "readingTimeMinutes": 60,
    "publishedYear": 2013,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Human decision-making operates like a narrow flashlight beam in a dark warehouse. This book equips you with a floodlight system to systematically outsmart your own hidden cognitive blind spots.",
      "coreThesis": "Intuition and gut instinct are plagued by systematic cognitive traps; lasting success requires a conscious, structured process that widens perspective, tests reality, detaches from emotion, and prepares for miscalculations.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Decisive"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "deep-down-we-know",
    "title": "Deep Down We Know",
    "author": "Ajahn Munindo",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2018,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "You do not need to construct wisdom from scratch; deep down, intuitive awareness already knows how to navigate reality when conditioned panic gets out of the way. Ajahn Munindo offers a calm, steady hand that guides you out of mental entanglements back into the quiet sanity that has been present all along.",
      "coreThesis": "Wisdom is an inherent quality of uncluttered awareness rather than an intellectual achievement. When you stop feeding emotional reactivity and rest in direct experiential presence, you uncover a steady, unshakeable knowing that already understands how to live freely.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Deep Down We Know"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "deep-work",
    "title": "Deep Work: Rules for Focused Success in a Distracted World",
    "author": "Cal Newport",
    "category": "Productivity",
    "subcategory": "Digital Detox & Attention",
    "coverColor": "from-blue-600 to-indigo-900",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/7988607-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2016,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Master the art of unbroken focus to produce rare, high-value breakthroughs in a distracted economy. Reclaim your mental bandwidth and turn daily effort into massive, tangible career momentum.",
      "coreThesis": "The ability to perform deep, distraction-free work is becoming increasingly rare just as its economic value is skyrocketing. Those who master this discipline will dominate their fields and find deeper professional fulfillment.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Deep Work: Rules for Focused Success in a Distracted World"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Core Insights"
    ]
  },
  {
    "id": "dependent-arising-a-practical-guide-to-early-buddhist-teachings",
    "title": "Dependent Arising: A Practical Guide to Early Buddhist Teachings",
    "author": "Bhikkhu Analayo",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/4890336-M.jpg",
    "readingTimeMinutes": 60,
    "publishedYear": 2021,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Human suffering is not a mystical curse or a permanent personal defect; it is the predictable output of a twelve-part mechanical feedback loop. By revealing the precise ignition points where sensations turn into compulsive reactivity, Bhikkhu An\\u0101layo shows how to dismantle psychological friction using clear-eyed systems engineering.",
      "coreThesis": "Suffering is an automated chain reaction driven by specific causes, and by observing the gap between raw feeling and emotional craving, the entire cycle can be consciously powered down.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Dependent Arising: A Practical Guide to Early Buddhist Teachings"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "designing-your-life-how-to-build-a-well-lived-joyful-life",
    "title": "Designing Your Life: How to Build a Well-Lived, Joyful Life",
    "author": "Bill Burnett & Dave Evans",
    "category": "Personal Growth",
    "subcategory": "Purpose & Meaning",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8760239-M.jpg",
    "readingTimeMinutes": 55,
    "publishedYear": 2016,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Life is not an engineering problem waiting for a single correct solution, but an ongoing design project waiting to be explored. By treating your path like an iterative craft, you replace paralyzing existential anxiety with quiet clarity and steady forward motion.",
      "coreThesis": "A fulfilling life is not discovered through abstract contemplation, but built through active curiosity, small prototypes, and thoughtful iteration.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Designing Your Life: How to Build a Well-Lived, Joyful Life"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "dhamma-everywhere-freeing-the-mind-across-all-postures",
    "title": "Dhamma Everywhere: Freeing the Mind Across All Postures",
    "author": "Sayadaw U Tejaniya",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2011,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Meditation is not an intense cushion sprint where you battle your own thoughts; it is a gentle, 24/7 background awareness that frees the mind in the middle of real life. Sayadaw U Tejaniya strips away mystical pretension to show how checking the attitude of your observing mind transforms driving, washing dishes, and daily stress into effortless awakening.",
      "coreThesis": "Liberation does not come from controlling your mental experiences, but from maintaining a relaxed, continuous awareness that observes the nature of the mind without greed or aversion.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Dhamma Everywhere: Freeing the Mind Across All Postures"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "dhamma-padetha-collection-of-insight-essays",
    "title": "Dhamma Padetha: Collection of Insight Essays",
    "author": "Sayadaw U Kundalabhivamsa",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 150,
    "publishedYear": 1999,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Mindfulness is not an escape from reality; it is the master key to meeting everyday life with clean hands and an unshakeable heart. Sayadaw U Kundalabhivamsa distills centuries of contemplative insight into immediate, practical tools for living peacefully and dying without fear.",
      "coreThesis": "Suffering arises from mistaking fleeting mental weather for a solid, permanent self; consistent moment-to-moment awareness dissolves this illusion and uncovers natural peace.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Dhamma Padetha: Collection of Insight Essays"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "difficult-conversations-how-to-discuss-what-matters-most",
    "title": "Difficult Conversations: How to Discuss What Matters Most",
    "author": "Douglas Stone, Bruce Patton, Sheila Heen",
    "category": "Communication",
    "subcategory": "Difficult Conversations",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/2555094-M.jpg",
    "readingTimeMinutes": 60,
    "publishedYear": 1999,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Tough conversations derail not because we lack words, but because hidden psychological currents drag us off course. Discover the hidden mechanics behind conflict and turn high-friction clashes into mutual learning.",
      "coreThesis": "A difficult conversation is never just about the surface facts; it is a learning journey across three levels\\u2014what happened, what was felt, and who we are.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Difficult Conversations: How to Discuss What Matters Most"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "digital-body-language-how-to-build-trust-and-connection-no-m",
    "title": "Digital Body Language: How to Build Trust and Connection, No Matter the Distance",
    "author": "Erica Dhawan",
    "category": "Communication",
    "subcategory": "Remote & Digital Communication",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/11091727-M.jpg",
    "readingTimeMinutes": 50,
    "publishedYear": 2021,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "In a world where physical gestures have vanished behind screens, your punctuation, response cadence, and channel choices are your new facial expressions. Master the hidden physics of virtual communication to turn daily digital anxiety into effortless trust and alignment.",
      "coreThesis": "Digital body language\\u2014composed of punctuation, pacing, formatting, and channel selection\\u2014has replaced physical cues as the primary engine of workplace trust and connection.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Digital Body Language: How to Build Trust and Connection, No Matter the Distance"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "disarming-the-narcissist",
    "title": "Disarming the Narcissist",
    "author": "Wendy T. Behary",
    "category": "Psychology",
    "subcategory": "Personality & Shadow Work",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/2923818-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2008,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop taking the bait and step out of the emotional crossfire: discover the hidden psychological wiring of self-absorbed personalities and master the exact communication blueprint to neutralize their defensive attacks.",
      "coreThesis": "Narcissistic aggression is an automated defense against deep-seated vulnerability, and you can only neutralize it by mastering your own emotional triggers and pairing genuine empathy with unshakeable personal boundaries.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Disarming the Narcissist"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "discourse-on-dependent-origination",
    "title": "Discourse on Dependent Origination",
    "author": "Mahasi Sayadaw",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 525,
    "publishedYear": 1982,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Suffering is not a mystery or a cosmic punishment; it is a mechanical chain reaction triggered the moment bare contact turns into blind craving. Mahasi Sayadaw lays bare the exact gears of existence and shows you how simple, mindful awareness can uncouple the train right at your doorstep.",
      "coreThesis": "Human suffering is neither random nor permanent, but a predictable chain reaction produced when unmindful contact turns into craving and clinging; by observing experiences as they arise without grasping, the entire cycle naturally uncouples.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Discourse on Dependent Origination"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "discourse-on-the-anattalakkhana-sutta",
    "title": "Discourse on the Anattalakkhana Sutta",
    "author": "Mahasi Sayadaw",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1963,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop trying to micromanage a self that doesn't exist. Mahasi Sayadaw unlocks the Buddha's most radical liberating discourse, showing through direct awareness that the burden of 'I' dissolves the moment you observe what is actually happening.",
      "coreThesis": "Nothing within your physical body or mental flow belongs to you, obeys your absolute command, or forms a permanent self; acknowledging this impersonal reality through direct observation dissolves suffering and reveals authentic liberation.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Discourse on the Anattalakkhana Sutta"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "discourse-on-the-ariyavasa-sutta",
    "title": "Discourse on the Ariyavasa Sutta",
    "author": "Mahasi Sayadaw",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 80,
    "publishedYear": 1980,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your mind is constantly living somewhere\\u2014either in the noisy storms of reaction or in the unshakeable stillness of pure awareness. This masterwork provides the exact architectural blueprint to relocate your daily life into the calm, noble sanctuary of awakened presence.",
      "coreThesis": "Liberation is not acquired through belief or esoteric rituals, but discovered through continuous, direct observation of the present moment, which transforms the mind from a turbulent battleground into a noble, serene sanctuary.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Discourse on the Ariyavasa Sutta"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "discourse-on-the-hemavata-sutta",
    "title": "Discourse on the Hemavata Sutta",
    "author": "Mahasi Sayadaw",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 90,
    "publishedYear": 1963,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Before trusting any spiritual path, subject it to the ultimate trial: inspect its teacher's conduct under a magnifying glass, then turn that same relentless awareness inward to witness how your senses construct reality. Mahasi Sayadaw transforms an ancient nocturnal dialogue into a razor-sharp, practical operating manual for direct psychological liberation.",
      "coreThesis": "Genuine spiritual awakening demands ruthless ethical scrutiny of conduct followed by bare, moment-to-moment sensory awareness that halts the automated generation of an ego.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Discourse on the Hemavata Sutta"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "discourse-on-the-malukyaputta-sutta",
    "title": "Discourse on the Malukyaputta Sutta",
    "author": "Mahasi Sayadaw",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1981,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "When an elderly monk begged for a practice simple enough to master before death, the Buddha gave him the ultimate shortcut to liberation: intercept reality at the five senses before your mind invents a story about it. Mahasi Sayadaw unlocks this ancient formula into a surgical, moment-to-moment manual for immediate peace.",
      "coreThesis": "Suffering is manufactured entirely in the split-second lag between sensory contact and mental projection; by resting in bare, immediate awareness at the six sense doors, craving cannot ignite and the mind abides in natural liberation.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Discourse on the Malukyaputta Sutta"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "discourse-on-the-purabheda-sutta",
    "title": "Discourse on the Purabheda Sutta",
    "author": "Mahasi Sayadaw",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 75,
    "publishedYear": 1982,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Mah\\u0101si Say\\u0101daw unpacks the Buddha\\u2019s timeless blueprint for emotional freedom: how to dismantle craving, regret, and anxiety before your days run out. Through lucid mindfulness, discover how to dwell in an unshakeable inner peace that sensory storms cannot disturb.",
      "coreThesis": "Genuine liberation is not a distant philosophical concept, but the immediate cessation of craving, regret, and ego-clinging through momentary bare awareness practiced before death.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Discourse on the Purabheda Sutta"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "discourse-on-the-sallekha-sutta",
    "title": "Discourse on the Sallekha Sutta",
    "author": "Mahasi Sayadaw",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 230,
    "publishedYear": 1969,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Spiritual practice is not an intellectual salon or a peaceful escape into daydreaming\\u2014it is an exacting, daily craft of scrubbing away ego grit. Mahasi Sayadaw turns the Buddha's Sallekha Sutta into an uncompromising, surgical field guide for dismantling forty-four mental toxins to reveal effortless, radiant freedom.",
      "coreThesis": "Genuine spiritual enlightenment is not a mystical high or an exotic theory, but the systematic, daily scrubbing away of forty-four inner defilements through bare mindfulness and ethical rigor.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Discourse on the Sallekha Sutta"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "discourse-on-the-silavanta-sutta",
    "title": "Discourse on the Silavanta Sutta",
    "author": "Mahasi Sayadaw",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1982,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Whether you are taking your first mindful breath or dwelling in profound spiritual freedom, the practice never changes: observe whatever arises in the mind and body right now. Mahasi Sayadaw unlocks the ancient S\\u012blavanta Sutta to reveal that the beginner's mirror and the master's mirror are identical.",
      "coreThesis": "From the very first steps of spiritual practice to total awakening, the single direct path to liberation is the continuous, bare observation of impermanence, suffering, and selflessness within your immediate bodily and mental experiences.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Discourse on the Silavanta Sutta"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "discourse-on-the-tuwathaka-sutta",
    "title": "Discourse on the Tuwathaka Sutta",
    "author": "Mahasi Sayadaw",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1976,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Cut through endless mental chatter and reclaim authentic peace right in the middle of daily life. Mahasi Sayadaw reveals the direct, practical manual for dismantling the ego's false narratives through plain, moment-to-moment awareness.",
      "coreThesis": "Suffering dissolves the moment you stop spinning personal stories around bare sensory inputs and instead observe all experiences rising and vanishing with detached, moment-by-moment mindfulness.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Discourse on the Tuwathaka Sutta"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "discourse-on-the-vammika-sutta",
    "title": "Discourse on the Vammika Sutta",
    "author": "Mahasi Sayadaw",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 90,
    "publishedYear": 1965,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your mind is an earthen ant-hill simmering with nighttime anxieties and erupting in daytime compulsions. Discover how Buddha's most ingenious parabolic riddle hands you the exact spade needed to dig up inner clutter and uncover unshakeable peace.",
      "coreThesis": "The human personality is a smoking mound of conditioned habits; by applying continuous mindful attention as a digging blade, you expose and discard every mental obstacle until pure, unconditioned freedom remains.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Discourse on the Vammika Sutta"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "discourse-on-the-wheel-of-dhamma",
    "title": "Discourse on the Wheel of Dhamma",
    "author": "Mahasi Sayadaw",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1981,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Think of human dissatisfaction not as an inescapable curse, but as a predictable mechanical glitch in how our attention processes reality. In this masterclass commentary, Mah\\u0101si Say\\u0101daw strips away mysticism to reveal the Buddha's foundational discourse as an exact, empirical blueprint for debugging mental suffering.",
      "coreThesis": "Psychological stress is a mechanical feedback loop triggered by friction between volatile reality and rigid craving; systematically calibrating bare sensory awareness unties this loop at its root.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Discourse on the Wheel of Dhamma"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "do-the-work",
    "title": "Do the Work",
    "author": "Steven Pressfield",
    "category": "Productivity",
    "subcategory": "Beating Procrastination",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10441643-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2011,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop thinking and start building: Resistance is an active, universal force designed to kill your best ideas before you can share them. This battle-tested field guide gives you the tactical roadmap to crush hesitation, navigate the messy middle, and ship your creative work on schedule.",
      "coreThesis": "Resistance is an active, toxic law of nature engineered to prevent your growth, and the only countermeasure is relentless, imperfect forward momentum until the work is shipped.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Do the Work"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "don-t-hold-back-monastic-reflections-on-practice",
    "title": "Don't Hold Back: Monastic Reflections on Practice",
    "author": "Ajahn Pasanno",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 60,
    "publishedYear": 2013,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop treating spiritual freedom like a distant finish line and discover what happens when you commit completely to the ground right beneath your feet. Drawing from decades of Thai Forest monastic wisdom, Ajahn Pasanno shows how holding nothing back in your everyday awareness unlocks an effortless, unshakeable inner peace.",
      "coreThesis": "Genuine liberation is not something added to the self, but the profound freedom realized when you stop withholding your honest attention and cleanly let go of grasping in the present moment.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Don't Hold Back: Monastic Reflections on Practice"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "don-t-look-at-the-mind-with-contempt",
    "title": "Don't Look at the Mind with Contempt",
    "author": "Sayadaw U Tejaniya",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 50,
    "publishedYear": 2006,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop wrestling with your restless mind and start studying it like a curious scientist. Sayadaw U Tejaniya reveals that the secret to lasting inner freedom is not forcing mental silence, but cultivating a relaxed, judgment-free awareness that treats every mental state as natural data.",
      "coreThesis": "Suffering is caused not by messy thoughts, but by the subtle aversion and contempt with which you judge them; liberation arises when you observe every mental state with relaxed, non-interfering awareness.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Don't Look at the Mind with Contempt"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "don-t-take-your-life-personally",
    "title": "Don't Take Your Life Personally",
    "author": "Ajahn Sumedho",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 150,
    "publishedYear": 2010,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop turning your daily thoughts and emotions into a dramatic personal courtroom. By stepping back into spacious awareness, you realize that life's weather does not define the sky.",
      "coreThesis": "You are not your transient thoughts, feelings, or conditioned personality; resting as the silent awareness that witnesses them frees you from taking life personally.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Don't Take Your Life Personally"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "dopamine-nation-finding-balance-in-the-age-of-indulgence",
    "title": "Dopamine Nation: Finding Balance in the Age of Indulgence",
    "author": "Anna Lembke",
    "category": "Productivity",
    "subcategory": "Beating Procrastination",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/11757830-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2021,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "We live in an era where high-octane rewards are available on demand, throwing our ancient survival wiring completely out of gear. Dr. Anna Lembke reveals how balancing the neurological seesaw of pleasure and pain is the hidden key to lasting peace and focus.",
      "coreThesis": "Pleasure and pain are processed in the same brain regions and constantly counterbalance each other; chasing constant high-stimulus pleasure inadvertently builds a crushing baseline of chronic pain and craving.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Dopamine Nation: Finding Balance in the Age of Indulgence"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "early-buddhist-meditation-studies",
    "title": "Early Buddhist Meditation Studies",
    "author": "Bhikkhu Analayo",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2017,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "What if ancient meditation wasn't mystical detachment, but a rigorous, precision-engineered operating system for human attention? Bhikkhu An\\u0101layo investigates the oldest surviving source texts to reveal the core mechanics of mental clarity, perception, and emotional resilience.",
      "coreThesis": "Meditation in early Buddhism is an active, unified cognitive feedback system where steady attention, bodily awareness, and boundless goodwill work together to dismantle emotional reactivity.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Early Buddhist Meditation Studies"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "early-buddhist-oral-tradition-and-textual-transmission",
    "title": "Early Buddhist Oral Tradition and Textual Transmission",
    "author": "Bhikkhu Analayo",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2022,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Before printing presses or flash drives, ancient meditators preserved vast libraries of philosophy purely through spoken sound. This book reverse-engineers the remarkable cognitive mechanics, peer-to-peer protocols, and human glitches of our species' most enduring oral network.",
      "coreThesis": "Early Buddhist scriptures are neither rigid stenographic transcripts nor arbitrary myths, but the reliable output of a disciplined, peer-to-peer oral memory network shaped by predictable cognitive dynamics and communal error-correction.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Early Buddhist Oral Tradition and Textual Transmission"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "effortless-make-it-easier-to-do-what-matters-most",
    "title": "Effortless: Make It Easier to Do What Matters Most",
    "author": "Greg McKeown",
    "category": "Productivity",
    "subcategory": "Time Management",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10699081-M.jpg",
    "readingTimeMinutes": 75,
    "publishedYear": 2021,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop burning out by believing that greater achievement requires grinding harder. Learn how to remove internal and external friction so doing what matters most becomes your easiest default option.",
      "coreThesis": "Life does not have to be relentless friction; by stripping away needless complexity, you can make essential progress both sustainable and effortless.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Effortless: Make It Easier to Do What Matters Most"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "elastic-habits",
    "title": "Elastic Habits",
    "author": "Stephen Guise",
    "category": "Productivity",
    "subcategory": "Habits & Routines",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10093450-M.jpg",
    "readingTimeMinutes": 60,
    "publishedYear": 2019,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Rigid habits snap when life gets messy; elastic habits bend, stretch, and keep your momentum alive every single day. By offering flexible tiers of intensity and multiple ways to win, this system turns daily consistency from a fragile chore into an unbreakable streak.",
      "coreThesis": "True discipline is not rigid perfection; it is elastic resilience that adapts daily effort to real-world energy while preserving an unbroken chain of action.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Elastic Habits"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "emotional-agility",
    "title": "Emotional Agility",
    "author": "Susan David",
    "category": "Psychology",
    "subcategory": "Emotional Intelligence",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8906617-M.jpg",
    "readingTimeMinutes": 55,
    "publishedYear": 2016,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Tough emotions are not defects to suppress\\u2014they are your brain's dashboard gauges showing what matters most. Emotional agility is the art of unhooking from automatic mental traps so you can act on your deepest values instead of your temporary impulses.",
      "coreThesis": "Your thoughts and emotions are useful advisory data, not ironclad directives; true resilience comes from acknowledging them with curiosity and choosing actions aligned with your core values.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Emotional Agility"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "essentialism-the-disciplined-pursuit-of-less",
    "title": "Essentialism: The Disciplined Pursuit of Less",
    "author": "Greg McKeown",
    "category": "Productivity",
    "subcategory": "Organization & Minimalism",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/7285986-M.jpg",
    "readingTimeMinutes": 100,
    "publishedYear": 2014,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop trying to do it all and start making your highest possible contribution by doing only what is essential. This is your playbook for replacing chaotic busyness with deliberate, high-impact focus.",
      "coreThesis": "Almost everything in life is noise; by ruthlessly eliminating the non-essential, you focus your finite energy entirely on the vital few.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Essentialism: The Disciplined Pursuit of Less"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "everything-arises-everything-falls-away",
    "title": "Everything Arises, Everything Falls Away",
    "author": "Ajahn Chah",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2005,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Freedom is not found by freezing life in place, but by learning to relax your grip on things that were never yours to keep. Ajahn Chah offers crystal-clear, grounded wisdom that turns everyday observation into an open door to lasting peace.",
      "coreThesis": "All experiences, thoughts, and feelings arise naturally and dissolve on their own; true peace arrives the moment you stop clinging to them or mistaking them for who you are.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Everything Arises, Everything Falls Away"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "everything-s-an-argument",
    "title": "Everything\\u2019s an Argument",
    "author": "Andrea A. Lunsford & John J. Ruszkiewicz",
    "category": "Creativity & Expression",
    "subcategory": "Logic, Rhetoric & Argument",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 110,
    "publishedYear": 1999,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Every sentence, road sign, menu design, and dress code is a quiet bid to influence how you perceive reality. Once you see the underlying architecture of persuasion, everyday human interaction shifts from random noise into an elegant, predictable system.",
      "coreThesis": "All human communication is an intentional act of persuasion, and every enduring argument functions as a mechanical system held together by visible evidence and invisible assumptions.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Everything\\u2019s an Argument"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "evolutionary-psychology-the-new-science-of-the-mind",
    "title": "Evolutionary Psychology: The New Science of the Mind",
    "author": "David M. Buss",
    "category": "Psychology",
    "subcategory": "Evolutionary Psychology",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/137975-M.jpg",
    "readingTimeMinutes": 65,
    "publishedYear": 1999,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your brain is not an empty blank slate; it is a precision Swiss Army knife packed with specialized psychological tools forged by ancestral survival challenges. By uncovering the evolutionary blueprints behind our desires, jealousies, and alliances, David Buss reveals the hidden biological machinery driving modern human behavior.",
      "coreThesis": "The human mind is an ensemble of specialized, domain-specific adaptations designed by natural and sexual selection to solve recurrent ancestral survival and reproductive challenges.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Evolutionary Psychology: The New Science of the Mind"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "expert-political-judgment",
    "title": "Expert Political Judgment",
    "author": "Philip E. Tetlock",
    "category": "Psychology",
    "subcategory": "Decision Making",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/443989-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2005,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Step into the cognitive laboratory where twenty years of real-world expert forecasts get dissected. Discover why famous pundits barely beat coin tosses while humble, adaptable thinkers quietly master foresight.",
      "coreThesis": "Foresight depends far more on how you think than what you know: adaptable, multi-perspective thinkers routinely outperform single-minded ideological experts.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Expert Political Judgment"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "factfulness",
    "title": "Factfulness",
    "author": "Hans Rosling",
    "category": "Psychology",
    "subcategory": "Cognitive Biases & Logic",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8186237-M.jpg",
    "readingTimeMinutes": 55,
    "publishedYear": 2018,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Our brains carry outdated survival heuristics that twist global reality into an ongoing crisis. Discover how ten hidden cognitive instincts warp our judgment and how simple data habits restore clarity.",
      "coreThesis": "The world is in a far better state than dramatic headlines suggest, because ten evolutionary cognitive instincts consistently distort our perception of reality.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Factfulness"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "fallacies-and-argument-appraisal",
    "title": "Fallacies and Argument Appraisal",
    "author": "Christopher W. Tindale",
    "category": "Creativity & Expression",
    "subcategory": "Logic, Rhetoric & Argument",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/1267762-M.jpg",
    "readingTimeMinutes": 50,
    "publishedYear": 2007,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Arguments are not static blueprints on a whiteboard\\u2014they are living exchanges shaped by speaker, audience, and real-time social context. Christopher W. Tindale reveals the hidden mechanics of human reasoning, showing you how to pinpoint flawed patterns and calibrate arguments with surgical precision.",
      "coreThesis": "Fallacies are contextual breakdowns in dialogue rather than mechanical rule violations, meaning an argument's validity depends on its audience, purpose, and conversational dynamics.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Fallacies and Argument Appraisal"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "feeling-good-the-new-mood-therapy",
    "title": "Feeling Good: The New Mood Therapy",
    "author": "David D. Burns",
    "category": "Psychology",
    "subcategory": "Human Behavior",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/7273771-M.jpg",
    "readingTimeMinutes": 140,
    "publishedYear": 1980,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your feelings do not reflect absolute reality; they reflect the internal stories you tell yourself. Learn the psychological mechanics of cognitive distortion to debug negative emotions and rewire your mood with scientific precision.",
      "coreThesis": "Emotions are not mysterious, unprompted forces; they are the direct biological echoes of conscious and unconscious thoughts. By systematically detecting and correcting distorted cognitive filters, you can reliably regulate your emotional life.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Feeling Good: The New Mood Therapy"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "fierce-conversations-achieving-success-at-work-and-in-life-o",
    "title": "Fierce Conversations: Achieving Success at Work and in Life One Conversation at a Time",
    "author": "Susan Scott",
    "category": "Communication",
    "subcategory": "Difficult Conversations",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/272648-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2002,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Our careers, relationships, and companies succeed or fail one conversation at a time. By replacing polite pretenses with courageous, candid dialogue, you dissolve persistent friction and spark breakthrough clarity.",
      "coreThesis": "The conversation is not just a tool for the relationship; the conversation IS the relationship. Real progress happens gradually, then suddenly, one courageous dialogue at a time.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Fierce Conversations: Achieving Success at Work and in Life One Conversation at a Time"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "find-your-why",
    "title": "Find Your Why",
    "author": "Simon Sinek, David Mead, Peter Docker",
    "category": "Personal Growth",
    "subcategory": "Purpose & Meaning",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8094461-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2017,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Before you choose which mountain to climb or how fast to run, you must understand the quiet compass inside your chest. Find Your Why provides a hands-on, step-by-step discipline to uncover your enduring purpose and bring serenity to daily decisions.",
      "coreThesis": "Your purpose is not an aspiration you invent for the future; it is an enduring truth distilled from your past that clarifies how you naturally serve the world.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Find Your Why"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "finding-the-missing-peace-a-primer-of-meditation",
    "title": "Finding the Missing Peace: A Primer of Meditation",
    "author": "Ajahn Amaro",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2011,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Peace is not an elusive prize waiting in a far-off sanctuary; it is your mind's natural baseline when you stop wrestling with the present moment. In this masterfully lucid primer, Ajahn Amaro distills decades of forest tradition practice into a direct, refreshingly practical roadmap for everyday tranquility.",
      "coreThesis": "Peace is not something created by straining effort; it is what remains when you stop fueling mental conflict and rest in the silent, innate awareness of the present moment.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Finding the Missing Peace: A Primer of Meditation"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "flow-the-psychology-of-optimal-experience",
    "title": "Flow: The Psychology of Optimal Experience",
    "author": "Mihaly Csikszentmihalyi",
    "category": "Productivity",
    "subcategory": "Focus & Deep Work",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/11041932-M.jpg",
    "readingTimeMinutes": 50,
    "publishedYear": 1990,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Happiness is not something that happens to you; it is a skill you cultivate by directing your attention. When your skills match an engaging challenge, self-consciousness vanishes, time bends, and everyday living becomes deeply enjoyable.",
      "coreThesis": "Genuine fulfillment occurs when psychic energy is invested in clearly defined, challenging tasks that stretch our capabilities and bring order to consciousness.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Flow: The Psychology of Optimal Experience"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "food-for-the-heart-collected-teachings",
    "title": "Food for the Heart: Collected Teachings",
    "author": "Ajahn Chah",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 185,
    "publishedYear": 2002,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your mind is naturally crystal-clear and quiet; it only suffers because it chases every passing mood like a leaf caught in a gust of wind. In 'Food for the Heart', master Ajahn Chah hands you the direct, earthy tools to stop fighting your life and rest in unshakeable freedom.",
      "coreThesis": "Suffering does not come from what happens to you, but from grasping what cannot be held. Freedom is opening your clenched fist and letting reality be exactly what it is.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Food for the Heart: Collected Teachings"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "fooled-by-randomness",
    "title": "Fooled by Randomness",
    "author": "Nassim Nicholas Taleb",
    "category": "Psychology",
    "subcategory": "Cognitive Biases & Logic",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/855791-M.jpg",
    "readingTimeMinutes": 70,
    "publishedYear": 2001,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Beneath every tidy success story lies a vast sea of invisible luck. This investigation reveals the hidden machinery fooling our brains into seeing skill where chaos reigns.",
      "coreThesis": "We mistake lucky outcomes for superior skill because our brains crave neat narratives over hidden randomness.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Fooled by Randomness"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "forgive-for-good",
    "title": "Forgive for Good",
    "author": "Fred Luskin",
    "category": "Psychology",
    "subcategory": "Mental Health & Healing",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/49013-M.jpg",
    "readingTimeMinutes": 80,
    "publishedYear": 2002,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Resentment is an involuntary physiological alarm stuck on repeat, draining battery life long after the intruder has left. Dr. Fred Luskin reveals the exact cognitive mechanics to silence the alarm, evict toxic squatters from your mental real estate, and reclaim total command over your nervous system.",
      "coreThesis": "A grievance is an active cognitive loop sustained by rigid expectations and personal blame; forgiveness is the deliberate reclamation of your nervous system by aligning with reality and evicting past hurts from your present attention.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Forgive for Good"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "four-thousand-weeks-time-management-for-mortals",
    "title": "Four Thousand Weeks: Time Management for Mortals",
    "author": "Oliver Burkeman",
    "category": "Productivity",
    "subcategory": "Daily Systems & Workflows",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/11990973-M.jpg",
    "readingTimeMinutes": 70,
    "publishedYear": 2021,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "You only get about four thousand weeks on Earth, and standard productivity hacks will never help you do it all. Embrace your limits, ditch the treadmill of inbox zero, and build a vibrant daily routine around what genuinely counts.",
      "coreThesis": "Your lifespan is roughly four thousand weeks, meaning you can never do everything. Freedom and peace arrive when you boldly choose what to neglect and focus deeply on the few commitments that matter.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Four Thousand Weeks: Time Management for Mortals"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "from-heart-to-heart-selected-dhamma-talks",
    "title": "From Heart to Heart: Selected Dhamma Talks",
    "author": "Ajahn Jayasaro",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2017,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Liberation is not an abstract intellectual puzzle, but a direct encounter with your immediate awareness. This work strips away esoteric religious clutter to show how real awakening passes from heart to heart through gritty simplicity and radical presence.",
      "coreThesis": "Genuine spiritual wisdom is directly realized within the quiet, unclouded heart, bypassing intellectual concepts through honest moment-to-moment awareness.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "From Heart to Heart: Selected Dhamma Talks"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "fundamentals-of-vipassana-meditation",
    "title": "Fundamentals of Vipassana Meditation",
    "author": "Mahasi Sayadaw",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 105,
    "publishedYear": 1961,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Step out of the exhausting storm of your conceptual thoughts and witness reality directly as it unfolds. Mahasi Sayadaw reveals the time-tested manual of bare awareness that dismantles chronic tension, dissolving the illusion of a separate self through simple, continuous observation.",
      "coreThesis": "Suffering dissolves when you stop identifying with passing sensations and instead observe every bodily and mental event with continuous, non-reactive awareness.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Fundamentals of Vipassana Meditation"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "get-out-of-your-mind-and-into-your-life",
    "title": "Get Out of Your Mind and Into Your Life",
    "author": "Steven C. Hayes",
    "category": "Psychology",
    "subcategory": "Human Behavior",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/821585-M.jpg",
    "readingTimeMinutes": 65,
    "publishedYear": 2005,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your mind is an overzealous survival engine wired to solve problems by fighting or fleeing, but treating unwanted emotions like kitchen fires only fans the flames. This foundational ACT guide reveals how stepping out of the mental boxing ring frees you to build a vital, purpose-driven life.",
      "coreThesis": "Suffering occurs when we treat our mind's descriptive thoughts as literal commands and run from unavoidable pain; freedom begins when we accept our inner weather and move toward our chosen values.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Get Out of Your Mind and Into Your Life"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "getting-past-no-negotiating-with-difficult-people",
    "title": "Getting Past No: Negotiating with Difficult People",
    "author": "William Ury",
    "category": "Sales & Persuasion",
    "subcategory": "Persuasion & Influence",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/369545-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 1991,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "When high-stakes negotiations stall against aggressive stonewalling and fiery hostility, brute force guarantees mutual defeat. William Ury reveals the counterintuitive behavioral mechanics of Breakthrough Negotiation\\u2014a battle-tested blueprint to disarm hostility, bypass ideological roadblocks, and turn stubborn adversaries into cooperative problem-solvers.",
      "coreThesis": "Hostile negotiations are cracked not by meeting pressure with counter-pressure, but by mastering your own reactions and systematically clearing the five psychological barriers standing between your counterpart and a durable agreement.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Getting Past No: Negotiating with Difficult People"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "getting-things-done-the-art-of-stress-free-productivity",
    "title": "Getting Things Done: The Art of Stress-Free Productivity",
    "author": "David Allen",
    "category": "Productivity",
    "subcategory": "Daily Systems & Workflows",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/109288-M.jpg",
    "readingTimeMinutes": 75,
    "publishedYear": 2001,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your mind is a brilliant studio for having ideas, not an overstuffed attic for storing them. Getting Things Done builds an external operating system that clears your headspace, kills anxiety, and translates every ambition into immediate, effortless action.",
      "coreThesis": "Stress does not come from having too much work; it comes from breaking agreements with yourself that your mind tries to track without an airtight system. By externalizing every commitment into concrete next actions within trusted buckets, you free your mind to focus entirely on execution and creativity.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Getting Things Done: The Art of Stress-Free Productivity"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "getting-to-yes-negotiating-agreement-without-giving-in",
    "title": "Getting to Yes: Negotiating Agreement Without Giving In",
    "author": "Roger Fisher & William Ury",
    "category": "Sales & Persuasion",
    "subcategory": "Persuasion & Influence",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/96165-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 1981,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Most negotiations stall because people dig into stubborn trenches like two drivers refusing to yield in a narrow alleyway. Principled negotiation unlocks agreement by attacking the underlying problem together rather than attacking each other.",
      "coreThesis": "Wise agreements come from focusing on underlying human interests and fair standards rather than defending stubborn personal positions.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Getting to Yes: Negotiating Agreement Without Giving In"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "going-for-refuge-and-taking-the-precepts",
    "title": "Going for Refuge and Taking the Precepts",
    "author": "Bhikkhu Bodhi",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 75,
    "publishedYear": 1981,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Before you can still the mind in deep meditation, you must anchor your life in unwavering direction and clean conduct. Bhikkhu Bodhi illuminates the twin foundations of Buddhist practice\\u2014taking refuge and undertaking moral precepts\\u2014revealing them not as ancient dogmas, but as practical tools for psychological stability and ultimate liberation.",
      "coreThesis": "True inner freedom requires an intentional compass of ultimate trust and practical guardrails of ethical restraint to quiet guilt, stabilize attention, and dissolve ego-driven suffering.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Going for Refuge and Taking the Precepts"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "good-reasons-for-better-arguments",
    "title": "Good Reasons for Better Arguments",
    "author": "Jerome E. Bickenbach & Jacqueline M. Davies",
    "category": "Creativity & Expression",
    "subcategory": "Logic, Rhetoric & Argument",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/7132971-M.jpg",
    "readingTimeMinutes": 50,
    "publishedYear": 1996,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Arguments are not verbal weapons designed for combat; they are collaborative calibration tools designed to uncover reality. By treating dialogue as structural engineering, this book reveals the hidden mechanics of how good reasons assemble into rock-solid conclusions.",
      "coreThesis": "A constructive argument is not an instrument of personal victory, but a cooperative architectural structure whose strength depends entirely on the acceptability, relevance, and sufficiency of its supporting reasons.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Good Reasons for Better Arguments"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "great-disciples-of-the-buddha-their-lives-and-legacy",
    "title": "Great Disciples of the Buddha: Their Lives and Legacy",
    "author": "Nyanaponika Thera & Hellmuth Hecker",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 50,
    "publishedYear": 1997,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Enlightenment is not a uniform mold; it is a prism through which distinct human temperaments achieve complete inner freedom. By chronicling twenty-four real men and women\\u2014scholars, outlaws, grief-stricken mothers, and wealthy executives\\u2014this book reveals how every personality type can transform daily friction into liberating clarity.",
      "coreThesis": "Human liberation does not require an identical personality or an escape from everyday reality; any life condition, skill, or temperament can become the direct vehicle for complete inner freedom when met with clear awareness and non-attachment.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Great Disciples of the Buddha: Their Lives and Legacy"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "he-understanding-masculine-psychology",
    "title": "He: Understanding Masculine Psychology",
    "author": "Robert A. Johnson",
    "category": "Psychology",
    "subcategory": "Personality & Shadow Work",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/42402-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 1974,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Why does external success often leave modern adults feeling mysteriously wounded, numb, or mechanically hollow? Robert A. Johnson uses the legendary Parsifal myth as a precise psychological circuit diagram, showing how reconciling our driven executive engine with inner emotional depth heals mid-life burnout.",
      "coreThesis": "Psychological maturity requires transitioning from driven, ego-fueled conquest to conscious inner reconciliation, healing the deep alienation of modern achievement by reconnecting the mind's executive drive with genuine soul and emotional integrity.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "He: Understanding Masculine Psychology"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "head-and-heart-together-essays-on-the-buddhist-path",
    "title": "Head and Heart Together: Essays on the Buddhist Path",
    "author": "Thanissaro Bhikkhu",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 65,
    "publishedYear": 2010,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Meditation is neither cold, dry intellectual detachment nor fuzzy, boundless emotionalism. Thanissaro Bhikkhu unites clear discernment with an open heart, offering a tough-minded, practical training manual for genuine spiritual freedom.",
      "coreThesis": "Authentic liberation requires uniting analytical discernment with universal goodwill, turning the mind into a disciplined craftsman capable of dismantling its own suffering.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Head and Heart Together: Essays on the Buddhist Path"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "healing-back-pain-the-mind-body-connection",
    "title": "Healing Back Pain: The Mind-Body Connection",
    "author": "John E. Sarno",
    "category": "Health & Longevity",
    "subcategory": "Longevity & Vitality",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/285502-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 1991,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Most chronic back pain isn't a broken spine; it is an ingenious protective illusion engineered by your own nervous system. By pulling back the curtain on this hidden feedback loop, you disarm the brain's alarm system and turn off the pain.",
      "coreThesis": "Chronic back pain is rarely a structural defect; it is a subconscious decoy engineered through mild oxygen deprivation to distract you from buried emotional tension. Exposing the decoy breaks the circuit and cures the pain.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Healing Back Pain: The Mind-Body Connection"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Finance",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "healing-the-shame-that-binds-you",
    "title": "Healing the Shame that Binds You",
    "author": "John Bradshaw",
    "category": "Psychology",
    "subcategory": "Emotional Intelligence",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/14621951-M.jpg",
    "readingTimeMinutes": 60,
    "publishedYear": 1988,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Guilt says you made a mistake; toxic shame says you *are* a mistake. John Bradshaw decodes the hidden operating system of self-contempt and provides a blueprint to rewire your emotional circuitry for genuine self-worth.",
      "coreThesis": "Toxic shame is an internalized identity of defectiveness inherited from broken relational systems, which dissolves only when brought out of hiding through conscious self-compassion, cognitive restructuring, and authentic human connection.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Healing the Shame that Binds You"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "hell-yeah-or-no",
    "title": "Hell Yeah or No",
    "author": "Derek Sivers",
    "category": "Productivity",
    "subcategory": "Time Management",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/13176855-M.jpg",
    "readingTimeMinutes": 335,
    "publishedYear": 2020,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop drowning in lukewarm commitments: if an opportunity doesn't trigger an automatic, wholehearted 'Hell Yeah!', treat it as an absolute 'No'. Derek Sivers hands you the ultimate mental toolkit to strip away obligation, master your daily energy, and pour your life force exclusively into what genuinely matters.",
      "coreThesis": "If an opportunity or commitment does not evoke an undeniable, enthusiastic 'Hell Yeah!', it is an immediate 'No'. Relentless subtraction of the mediocre is the only way to create the empty space required for true excellence to take root.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Hell Yeah or No"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "honoring-the-self",
    "title": "Honoring the Self",
    "author": "Nathaniel Branden",
    "category": "Personal Growth",
    "subcategory": "Authenticity & Self-Worth",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/368810-M.jpg",
    "readingTimeMinutes": 60,
    "publishedYear": 1983,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your self-esteem is not an emotional trophy you win from other people's applause; it is the operating system and immune system of your own mind. Nathaniel Branden decodes the hidden psychological circuits of approval addiction, providing an empowering blueprint to claim autonomy, dismantle guilt, and anchor your self-worth internally.",
      "coreThesis": "Self-esteem is an internal biological and cognitive requirement generated only by self-directed consciousness and personal integrity\\u2014never by external applause, social conformity, or self-sacrificing compliance.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Honoring the Self"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "hope-and-help-for-your-nerves",
    "title": "Hope and Help for Your Nerves",
    "author": "Claire Weekes",
    "category": "Psychology",
    "subcategory": "Anxiety & Stress Relief",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/7135421-M.jpg",
    "readingTimeMinutes": 145,
    "publishedYear": 1969,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Chronic anxiety is not a broken mind; it is an oversensitive nervous system trapped in a self-igniting biofeedback loop. By replacing instinctive tension with active, biological non-resistance, you pull the oxygen out of the fear furnace.",
      "coreThesis": "Anxiety is maintained entirely by your reaction to its physical sensations; when you eliminate the 'second fear' of the symptoms themselves, the nervous system naturally resets and heals.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Hope and Help for Your Nerves"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "how-not-to-be-wrong-the-power-of-mathematical-thinking",
    "title": "How Not to Be Wrong: The Power of Mathematical Thinking",
    "author": "Jordan Ellenberg",
    "category": "Psychology",
    "subcategory": "Decision Making",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/9930581-M.jpg",
    "readingTimeMinutes": 90,
    "publishedYear": 2014,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Most strategic failures stem from bad arithmetic rather than bad intentions. Master mathematical thinking to spot asymmetric leverage and strip away self-deceiving illusions.",
      "coreThesis": "Mathematical thinking is tactical common sense systematized to eliminate blind spots and exploit asymmetric realities under uncertainty.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "How Not to Be Wrong: The Power of Mathematical Thinking"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "how-to-decide",
    "title": "How to Decide",
    "author": "Annie Duke",
    "category": "Psychology",
    "subcategory": "Decision Making",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10430083-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2020,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Most operators confuse execution quality with pure luck, mistaking lucky breaks for genius. This manual builds an unsentimental, probabilistic architecture to engineer superior long-run odds.",
      "coreThesis": "A quality decision is not defined by its outcome, but by the rigorous probabilistic process used to navigate uncertainty before the result is known.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "How to Decide"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "how-to-have-impossible-conversations",
    "title": "How to Have Impossible Conversations",
    "author": "Peter Boghossian & James Lindsay",
    "category": "Creativity & Expression",
    "subcategory": "Logic, Rhetoric & Argument",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/9352170-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2019,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "When disagreement strikes, treating people like malfunctioning computers that need data updates guarantees mutual defensiveness. This book provides a masterclass in conversational mechanics\\u2014showing you how to replace verbal boxing matches with collaborative inquiry that naturally opens rigid minds.",
      "coreThesis": "People do not abandon deeply held beliefs through forced factual submission; minds evolve only when conversational safety and Socratic questioning prompt individuals to inspect their own epistemology.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "How to Have Impossible Conversations"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "how-to-read-a-book",
    "title": "How to Read a Book",
    "author": "Mortimer J. Adler & Charles Van Doren",
    "category": "Productivity",
    "subcategory": "Daily Systems & Workflows",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/405381-M.jpg",
    "readingTimeMinutes": 105,
    "publishedYear": 1972,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Most people treat reading like lounging in a passenger seat, but true comprehension requires grabbing the wheel and driving hard. This definitive manual unveils reading as an athletic, cognitive discipline that stretches your mental bandwidth and turns passive scanning into active mastery.",
      "coreThesis": "True reading is an active cognitive sport where understanding increases only in proportion to the intensity of mental effort invested. By mastering progressive levels of reading\\u2014from structural scouting to cross-book synthesis\\u2014readers transform information intake into profound intellectual growth.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "How to Read a Book"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "how-to-take-smart-notes",
    "title": "How to Take Smart Notes",
    "author": "S\\u00f6nke Ahrens",
    "category": "Productivity",
    "subcategory": "Daily Systems & Workflows",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8362230-M.jpg",
    "readingTimeMinutes": 70,
    "publishedYear": 2017,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop treating your brain as a storage closet and build an interconnected thinking partner that compound-interests your knowledge over time. By capturing atomic ideas and linking them bottom-up, you never face a blank screen again.",
      "coreThesis": "Thinking occurs through externalized, interconnected notes rather than inside biological working memory alone; writing is not the summary of thought, but the vehicle that builds it.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "How to Take Smart Notes"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "how-to-win-any-argument",
    "title": "How to Win Any Argument",
    "author": "Robert Mayer",
    "category": "Creativity & Expression",
    "subcategory": "Logic, Rhetoric & Argument",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/799868-M.jpg",
    "readingTimeMinutes": 75,
    "publishedYear": 2005,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Persuasion is an engineering problem, not a volume contest. By replacing aggressive debate with psychological judo, you guide opponents into choosing your conclusion willingly without a single raised voice.",
      "coreThesis": "You do not win an argument by defeating an opponent; you win by transforming the debate into a collaborative zone where your outcome is the counterpart's most reasonable choice.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "How to Win Any Argument"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "humble-inquiry-the-gentle-art-of-asking-instead-of-telling",
    "title": "Humble Inquiry: The Gentle Art of Asking Instead of Telling",
    "author": "Edgar H. Schein",
    "category": "Communication",
    "subcategory": "Difficult Conversations",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/13149241-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2013,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Telling dominates human conversation, but when complex systems fail, directive orders blind us to the ground truth. Edgar Schein reveals how genuine, humble questioning unlocks mission-critical data, diffuses defensive barriers, and builds unbreakable trust.",
      "coreThesis": "Genuine collaboration and error-free execution require trading the impulse to tell for the discipline of asking questions to which you do not already know the answer, consciously choosing vulnerability to access critical truth.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Humble Inquiry: The Gentle Art of Asking Instead of Telling"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "i-hear-you-the-surprisingly-simple-skill-behind-extraordinar",
    "title": "I Hear You: The Surprisingly Simple Skill Behind Extraordinary Relationships",
    "author": "Michael S. Sorensen",
    "category": "Communication",
    "subcategory": "Active Listening & Empathy",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10082732-M.jpg",
    "readingTimeMinutes": 60,
    "publishedYear": 2017,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Most arguments do not stem from bad logic; they stem from emotional starvation. This book reveals the simple mechanical lever that diffuses defensive tension, builds trust, and makes every conversation work: validation.",
      "coreThesis": "People cannot process logic or collaborate constructively until their emotional reality has been acknowledged and validated.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "I Hear You: The Surprisingly Simple Skill Behind Extraordinary Relationships"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "i-thought-it-was-just-me-but-it-isn-t",
    "title": "I Thought It Was Just Me (but it isn't)",
    "author": "Bren\\u00e9 Brown",
    "category": "Personal Growth",
    "subcategory": "Authenticity & Self-Worth",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/1980226-M.jpg",
    "readingTimeMinutes": 50,
    "publishedYear": 2007,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Shame thrives in dark corners of silence and tells you that you are fundamentally broken. By mapping its biological tripwires and shining the light of empathy on your hidden struggles, you dismantle social paralysis and step into authentic self-worth.",
      "coreThesis": "Shame derives its destructive power from secrecy, silence, and judgment; exposing it through self-awareness and empathic connection permanently breaks its hold over your identity.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "I Thought It Was Just Me (but it isn't)"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "ikigai-the-japanese-secret-to-a-long-and-happy-life",
    "title": "Ikigai: The Japanese Secret to a Long and Happy Life",
    "author": "H\\u00e9ctor Garc\\u00eda & Francesc Miralles",
    "category": "Personal Growth",
    "subcategory": "Purpose & Meaning",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/11300391-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2016,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Longevity is not an accident of genetics; it is the quiet byproduct of having an authentic reason to wake up each dawn. By aligning purposeful daily action with calm self-restraint, you transform ordinary living into an enduring source of vitality.",
      "coreThesis": "A long and serene life arises when daily presence, moderate habits, and close community revolve around an enduring personal purpose.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Ikigai: The Japanese Secret to a Long and Happy Life"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "in-defense-of-food",
    "title": "In Defense of Food",
    "author": "Michael Pollan",
    "category": "Health & Longevity",
    "subcategory": "Nutrition & Metabolism",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/2960867-M.jpg",
    "readingTimeMinutes": 85,
    "publishedYear": 2008,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Eat food. Not too much. Mostly plants. In seven immortal words, Michael Pollan exposes how reductionist food science hijacked our dinner plates and reveals how returning to real, living ingredients restores lifelong metabolic health.",
      "coreThesis": "The modern Western diet of engineered, nutrient-stripped commodities is the root cause of chronic metabolic illness; true vitality requires abandoning reductionist food science in favor of real, traditional, whole foods eaten with mindful moderation.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "In Defense of Food"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Finance",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "in-sheep-s-clothing-understanding-and-dealing-with-manipulat",
    "title": "In Sheep's Clothing: Understanding and Dealing with Manipulative People",
    "author": "George K. Simon",
    "category": "Sales & Persuasion",
    "subcategory": "Objection Handling",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/729225-M.jpg",
    "readingTimeMinutes": 50,
    "publishedYear": 1996,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Step into the behavioral mechanics lab: manipulators aren't misunderstood, wounded souls acting out of anxiety\\u2014they are skilled fighters actively angling to win while concealing their punches. Once you see the hidden levers of covert aggression, you can reset the rules of engagement and render their tactics completely powerless.",
      "coreThesis": "Manipulative behavior is not an emotional cry for help rooted in neurosis, but an intentional, covert combat strategy designed to dominate others while keeping the aggressor's social image spotless.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "In Sheep's Clothing: Understanding and Dealing with Manipulative People"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "in-simple-terms-108-dhamma-similes",
    "title": "In Simple Terms: 108 Dhamma Similes",
    "author": "Ajahn Chah",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 540,
    "publishedYear": 2013,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Ajahn Chah strips away ornate monastic dogma to hand you 108 razor-sharp, down-to-earth parables on taming your mind. Discover why inner peace isn't an exotic destination, but the simple, radical art of putting down the heavy rocks you carry every day.",
      "coreThesis": "Suffering comes not from changing circumstances, but from grasping what naturally slips away; true peace is the effortless baseline revealed the moment you drop what you carry.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "In Simple Terms: 108 Dhamma Similes"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "in-the-buddha-s-words-an-anthology-from-the-pali-canon",
    "title": "In the Buddha's Words: An Anthology from the Pali Canon",
    "author": "Bhikkhu Bodhi",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 50,
    "publishedYear": 2005,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Direct from humanity's oldest contemplative treasury, this book distills the historical Buddha's core discourses into a clear, stepwise manual for mastering the mind and finding unshakeable peace amidst life's storms.",
      "coreThesis": "Suffering arises because we grasp tightly at fleeting experiences and mistake a transient mind-body process for a solid self; train the mind in calm mindfulness and penetrating insight, and you step into timeless freedom.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "In the Buddha's Words: An Anthology from the Pali Canon"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "in-the-realm-of-hungry-ghosts",
    "title": "In the Realm of Hungry Ghosts",
    "author": "Gabor Mat\\u00e9",
    "category": "Productivity",
    "subcategory": "Beating Procrastination",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/4653016-M.jpg",
    "readingTimeMinutes": 165,
    "publishedYear": 2008,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Addiction isn't a moral defect or an inescapable genetic curse\\u2014it is a survival response to unaddressed emotional pain. By examining the brain's internal wiring, this book reveals why we chase quick fixes and how genuine healing begins with curiosity rather than punishment.",
      "coreThesis": "Addiction is never the primary problem; it is a desperate attempt to solve deep, unsoothed emotional pain. Real recovery requires shifting our core question from 'Why the addiction?' to 'Why the pain?'",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "In the Realm of Hungry Ghosts"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "in-this-very-life-the-liberation-teachings-of-the-buddha",
    "title": "In This Very Life: The Liberation Teachings of the Buddha",
    "author": "Sayadaw U Pandita",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1992,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Liberation is not an elusive myth reserved for ancient monks; it is a direct, achievable reality attainable right now through uncompromising, moment-to-moment mindfulness. Sayadaw U Pandita provides a razor-sharp, practical field manual to dismantle suffering and awaken in this very life.",
      "coreThesis": "Complete freedom from suffering is directly accessible in this immediate lifetime through rigorous, unbroken, moment-to-moment mindfulness of mind and body.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "In This Very Life: The Liberation Teachings of the Buddha"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "indistractable-how-to-control-your-attention-and-choose-your",
    "title": "Indistractable: How to Control Your Attention and Choose Your Life",
    "author": "Nir Eyal",
    "category": "Productivity",
    "subcategory": "Focus & Deep Work",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/9129784-M.jpg",
    "readingTimeMinutes": 175,
    "publishedYear": 2019,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Distraction is not a technology problem; it is a human discomfort problem. By mastering the hidden emotional discomforts behind your impulses, you can design an ironclad operating system for your attention and live by deliberate design.",
      "coreThesis": "Distraction is always an unhealthy escape from internal discomfort; you can only become focused when you manage emotional triggers and align your calendar with your core values.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Indistractable: How to Control Your Attention and Choose Your Life"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "influence-the-psychology-of-persuasion",
    "title": "Influence: The Psychology of Persuasion",
    "author": "Robert B. Cialdini",
    "category": "Sales & Persuasion",
    "subcategory": "Persuasion & Influence",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/431011-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 1984,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Human decision-making operates like an internal autopilot governed by hidden trigger mechanisms. Master the six universal psychological levers that drive automatic compliance, and you will instantly decode why people say 'yes' when they mean 'no.'",
      "coreThesis": "Human beings rely on automatic, cue-triggered shortcuts to navigate complex choices, making our decisions predictable and easily influenced by anyone who activates these universal psychological levers.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Influence: The Psychology of Persuasion"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "inner-strength-sixteen-aspects-of-the-dhamma",
    "title": "Inner Strength: Sixteen Aspects of the Dhamma",
    "author": "Ajahn Lee Dhammadharo",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 80,
    "publishedYear": 1998,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Ajahn Lee shows that true inner strength is not an abstract philosophy, but a practical craftsmanship of breath and mind developed right inside your ribcage. By refining your attention like an artisan working with raw gold, you transform daily mental reactivity into unshakable, natural freedom.",
      "coreThesis": "Genuine liberation is an empirical craft: by mastering bodily breath energy and cultivating silent, non-clinging discernment, awareness frees itself from all fabricated suffering.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Inner Strength: Sixteen Aspects of the Dhamma"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "inner-work-using-dreams-and-active-imagination-for-personal-",
    "title": "Inner Work: Using Dreams and Active Imagination for Personal Growth",
    "author": "Robert A. Johnson",
    "category": "Psychology",
    "subcategory": "Personality & Shadow Work",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/48318-M.jpg",
    "readingTimeMinutes": 80,
    "publishedYear": 1986,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your conscious ego is only the tip of the iceberg; beneath the surface runs a massive, self-regulating inner intelligence. Robert A. Johnson hands you a practical laboratory manual to decode your dreams and hold direct, two-way conversations with your deeper self.",
      "coreThesis": "Wholeness requires establishing a deliberate, respectful communication channel between the conscious ego and the unconscious mind through disciplined symbolic work and physical rituals.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Inner Work: Using Dreams and Active Imagination for Personal Growth"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "insight-meditation-the-path-to-peace",
    "title": "Insight Meditation: The Path to Peace",
    "author": "Sayadaw U Sobhana",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1979,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop wrestling with your mind and start watching it work. Venerable Sayadaw U Sobhana strips away centuries of mystical fog to deliver an exact, step-by-step practical manual for uncovering unshakable inner stillness right in the middle of everyday life.",
      "coreThesis": "Suffering dissolves the exact instant you stop identifying with passing thoughts and physical sensations, meeting every present-moment experience with neutral, bare awareness.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Insight Meditation: The Path to Peace"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "insight-meditation-workshop-manual",
    "title": "Insight Meditation Workshop Manual",
    "author": "Sayadaw U Thondara",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1996,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "A crystal-clear, hands-on field manual for training direct awareness and dismantling mental friction without dogma or mystification. It translates ancient insight practice into a step-by-step diagnostic toolkit for modern everyday sanity.",
      "coreThesis": "Suffering dissolves when attention shifts from believing mental narratives to directly observing the real-time physical and mental sensations that make up each fleeting moment.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Insight Meditation Workshop Manual"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "into-the-stream-a-study-guide-on-the-first-stage-of-awakening",
    "title": "Into the Stream: A Study Guide on the First Stage of Awakening",
    "author": "Thanissaro Bhikkhu",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2011,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stream-entry is not a vague mystical trance, but a precise, verifiable milestone where the mind catches its first direct glimpse of the unconditioned. Thanissaro Bhikkhu maps the exact practical training required to step into the current of liberation and ensure total freedom from suffering.",
      "coreThesis": "The first stage of awakening is a verifiable shift in perception won by systematic mental craftsmanship: when attention ceases feeding habitual reactive fabrications, the mind directly touches the unconditioned and enters an irreversible current toward total liberation.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Into the Stream: A Study Guide on the First Stage of Awakening"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "introduction-to-logic",
    "title": "Introduction to Logic",
    "author": "Irving M. Copi, Carl Cohen, Victor Rodych",
    "category": "Creativity & Expression",
    "subcategory": "Logic, Rhetoric & Argument",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/89707-M.jpg",
    "readingTimeMinutes": 70,
    "publishedYear": 2019,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Think of human communication as an invisible power grid: most conflicts arise from short-circuits, loose connections, and bad wiring rather than malice. Copi, Cohen, and Rodych hand you the master multimeter and blueprint to inspect, test, and build unbreakable reasoning.",
      "coreThesis": "Sound reasoning is an objective, testable science governed by structural mechanics; strip away rhetoric and emotional charge, and an argument's validity can be engineered and verified as rigorously as a physical bridge.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Introduction to Logic"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "intuitive-awareness-living-in-the-unconditioned",
    "title": "Intuitive Awareness: Living in the Unconditioned",
    "author": "Ajahn Sumedho",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 55,
    "publishedYear": 2004,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop wrestling with your busy mind and step back into the quiet space that notices the struggle. Freedom isn't something you build\\u2014it is the wide-open sky of awareness already present behind every passing storm.",
      "coreThesis": "Suffering occurs only when we identify with passing mental and emotional weather; true liberation is directly recognizing and resting in the untouched, open space of awareness that holds it all.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Intuitive Awareness: Living in the Unconditioned"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "investigating-the-dhamma-a-collection-of-essays",
    "title": "Investigating the Dhamma: A Collection of Essays",
    "author": "Bhikkhu Bodhi",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2015,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Cut through fashionable spiritual marketing and inspect the raw balance sheet of the human mind with one of modern Buddhism\\u2019s sharpest forensic auditors. Bhikkhu Bodhi delivers an unvarnished masterclass in emotional risk management, proving that real freedom comes from auditing false mental assets rather than buying into feel-good fads.",
      "coreThesis": "Genuine mental freedom is not achieved through trendy intellectual compromises, but through the rigorous, unvarnished audit and liquidation of toxic emotional attachments.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Investigating the Dhamma: A Collection of Essays"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "invisible-influence-the-hidden-forces-that-shape-behavior",
    "title": "Invisible Influence: The Hidden Forces that Shape Behavior",
    "author": "Jonah Berger",
    "category": "Sales & Persuasion",
    "subcategory": "Buyer Psychology",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8869123-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2016,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "We believe our choices are completely independent, yet invisible social gravity shapes everything from the cars we drive to the careers we pursue. Jonah Berger unpacks the hidden physics of social influence, showing you how to steer these currents instead of drifting with the tide.",
      "coreThesis": "Human behavior is continually guided by invisible social forces that push us toward conformity, pull us toward differentiation, and subtly dictate our performance.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Invisible Influence: The Hidden Forces that Shape Behavior"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "just-listen-discover-the-secret-to-getting-through-to-absolu",
    "title": "Just Listen: Discover the Secret to Getting Through to Absolutely Anyone",
    "author": "Mark Goulston",
    "category": "Communication",
    "subcategory": "Active Listening & Empathy",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8082622-M.jpg",
    "readingTimeMinutes": 150,
    "publishedYear": 2009,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "When communication stalls, pushing harder only locks the emotional brakes tighter. By mastering hostage-negotiator neuroscience, you can neutralize fight-or-flight defensiveness and guide any stubborn mind from pure hostility to willing cooperation.",
      "coreThesis": "People do not open their minds because they understand your logic; they open their minds when they realize you understand their reality.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Just Listen: Discover the Secret to Getting Through to Absolutely Anyone"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "just-one-more-breath-teachings-on-meditation-and-life",
    "title": "Just One More Breath: Teachings on Meditation and Life",
    "author": "Ajahn Amaro",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2016,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop running on the consumerist treadmill of craving and discovering the quiet freedom already present in your direct awareness. Ajahn Amaro masterfully illuminates how stepping out of the cycle of 'just one more' opens the boundless, effortless joy of celebrating life as it is.",
      "coreThesis": "Suffering is perpetuated by the delusion that fulfillment lies in 'just one more' gratification; genuine liberation arises when mindful awareness intercepts the urge to grasp, revealing our inherent completeness through appreciative joy.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Just One More Breath: Teachings on Meditation and Life"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "just-one-word-mindfulness",
    "title": "Just One Word: Mindfulness",
    "author": "Ajahn Chah",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2011,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Cut through endless spiritual debates and overthinking with a single, direct command: wake up to this immediate breath, see thoughts as passing weather, and drop what hurts.",
      "coreThesis": "Suffering is not caused by life's fluctuating conditions, but by our habit of grasping what changes; seeing this clearly in the immediate moment through bare mindfulness is the entire path to peace.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Just One Word: Mindfulness"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "keeping-the-breath-in-mind-lessons-in-samadhi",
    "title": "Keeping the Breath in Mind & Lessons in Samadhi",
    "author": "Ajahn Lee Dhammadharo",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1953,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your breath is not just air in the lungs\\u2014it is an internal energy grid you can actively tune to dissolve tension and stabilize awareness. Master Thai forest teacher Ajahn Lee provides a manual for transforming ordinary respiration into a sanctuary of profound meditative stillness and liberating insight.",
      "coreThesis": "Breath is an active, malleable life energy that can be systematically refined to calm the nervous system, unify attention, and awaken liberating discernment.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Keeping the Breath in Mind & Lessons in Samadhi"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "kill-it-with-fire-manage-aging-computer-systems-and-communic",
    "title": "Kill It with Fire: Manage Aging Computer Systems (and Communication)",
    "author": "Marianne Bellotti",
    "category": "Communication",
    "subcategory": "Remote & Digital Communication",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10597716-M.jpg",
    "readingTimeMinutes": 50,
    "publishedYear": 2021,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Legacy systems fail not because their technology grows obsolete, but because human organizations lose the institutional memory and communication habits that sustain them. Marianne Bellotti reveals how to modernize foundational infrastructure without burning everything down in a high-risk rewrite.",
      "coreThesis": "Complex systems survive and adapt when organizations treat modernization as an ongoing socio-technical habit of communication and incremental refactoring, rather than a catastrophic total rewrite.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Kill It with Fire: Manage Aging Computer Systems (and Communication)"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "king-warrior-magician-lover",
    "title": "King, Warrior, Magician, Lover",
    "author": "Robert Moore & Douglas Gillette",
    "category": "Psychology",
    "subcategory": "Personality & Shadow Work",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/4095771-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 1990,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Human maturity isn't automatic; it is an internal operating system built on four distinct structural engines. Master their dynamics, or your psyche defaults to destructive shadow loops that quietly derail your career, relationships, and purpose.",
      "coreThesis": "Psychological maturity requires consciously balancing four archetypal energies\\u2014the King, Warrior, Magician, and Lover\\u2014because unintegrated energies inevitably degrade into destructive bi-polar shadow states of active inflation or passive collapse.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "King, Warrior, Magician, Lover"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "learn-like-a-pro",
    "title": "Learn Like a Pro",
    "author": "Barbara Oakley & Olav Schewe",
    "category": "Productivity",
    "subcategory": "Speed Reading & Learning",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10465883-M.jpg",
    "readingTimeMinutes": 50,
    "publishedYear": 2021,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Learning is not an innate genetic gift; it is a mechanical biological craft governed by how your brain weaves and consolidates neural wires. Master two distinct modes of thinking and you can master any skill on demand.",
      "coreThesis": "Deep competence is forged by alternating focused effort with subconscious diffuse incubation, cementing neural pathways through active retrieval rather than passive consumption.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Learn Like a Pro"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "learned-optimism",
    "title": "Learned Optimism",
    "author": "Martin E.P. Seligman",
    "category": "Psychology",
    "subcategory": "Mental Health & Healing",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/746945-M.jpg",
    "readingTimeMinutes": 75,
    "publishedYear": 1991,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Helplessness is not an ingrained flaw\\u2014it is a conditioned reflex you can systematically unlearn. By rewiring the automatic inner script you use during setbacks, you transform chronic mental gridlock into durable stamina and daily agency.",
      "coreThesis": "Helplessness is a learned reaction driven by flawed explanatory habits; by disputing catastrophic self-talk with concrete evidence, anyone can build enduring resilience.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Learned Optimism"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "life-is-in-the-transitions",
    "title": "Life Is in the Transitions",
    "author": "Bruce Feiler",
    "category": "Personal Growth",
    "subcategory": "Life Transitions & Reinvention",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 70,
    "publishedYear": 2020,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "The neat, linear career-and-family staircase is dead; real life is an undulating ecosystem punctuated by recurring disruptions and massive personal earthquakes. Bruce Feiler decodes hundreds of real-life reinventions to reveal a master toolkit for navigating the messy middle and turning unavoidable upheaval into renewal.",
      "coreThesis": "Adulthood is not a tidy, predictable straight line, but a dynamic series of nonlinear disruptions; mastering the art of life transitions is the fundamental survival skill of modern existence.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Life Is in the Transitions"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "like-a-clear-sky-dhamma-reflections",
    "title": "Like a Clear Sky: Dhamma Reflections",
    "author": "Ajahn Pasanno",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 60,
    "publishedYear": 2013,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your mind is not the turbulent storm of thoughts racing through your head; it is the vast, quiet sky that effortlessly holds them. By learning to step back into this spacious awareness, you stop drowning in passing mental weather and discover an unshakeable inner peace available right in the middle of everyday life.",
      "coreThesis": "Suffering occurs only when we mistake temporary passing thoughts and emotional weather for who we are; true liberation is simply remembering to rest as the spacious, clear awareness that observes them without resistance.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Like a Clear Sky: Dhamma Reflections"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "limitless",
    "title": "Limitless",
    "author": "Jim Kwik",
    "category": "Productivity",
    "subcategory": "Speed Reading & Learning",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/9360116-M.jpg",
    "readingTimeMinutes": 75,
    "publishedYear": 2020,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Imagine discovering that your brain isn't a plain cardboard box, but a secret Tony Stark high-tech suit waiting for you to turn the power on! This book hands you the instruction manual to upgrade your memory, read like a rocket, and unlock your true brain superpowers.",
      "coreThesis": "Your brain is not fixed like a statue; it is a superpower muscle that can expand and unlock limitless abilities when you combine belief, daily fuel, and proven learning cheat-codes.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Limitless"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "linked-how-everything-is-connected",
    "title": "Linked: How Everything Is Connected",
    "author": "Albert-L\\u00e1szl\\u00f3 Barab\\u00e1si",
    "category": "Psychology",
    "subcategory": "Human Behavior",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/14582832-M.jpg",
    "readingTimeMinutes": 75,
    "publishedYear": 2002,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Beneath nature, internet architecture, and corporate markets lies a single hidden blueprint. Master the invisible topology of hubs to navigate complexity without getting caught off guard.",
      "coreThesis": "Real-world networks do not organize randomly; they evolve into scale-free webs where critical hubs govern resilience, flow, and systemic vulnerability.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Linked: How Everything Is Connected"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "listen-like-you-mean-it-reclaiming-the-lost-art-of-true-conn",
    "title": "Listen Like You Mean It: Reclaiming the Lost Art of True Connection",
    "author": "Ximena Vengoechea",
    "category": "Communication",
    "subcategory": "Active Listening & Empathy",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/11386748-M.jpg",
    "readingTimeMinutes": 55,
    "publishedYear": 2021,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Most people treat conversations like bumper cars, waiting for a pause simply to crash in with their own thoughts. Ximena Vengoechea transforms everyday listening into a high-precision observational art that decodes what people truly mean beneath what they say.",
      "coreThesis": "Genuine connection occurs not by orchestrating brilliant responses, but by cultivating an open, observant posture that decodes the speaker's unvarnished truth without hijacking the exchange.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Listen Like You Mean It: Reclaiming the Lost Art of True Connection"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "living-dhamma",
    "title": "Living Dhamma",
    "author": "Ajahn Chah",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1992,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop chasing peace as if it were an object to acquire; genuine freedom begins the moment you stop fighting reality and observe your mind with unwavering, neutral clarity.",
      "coreThesis": "Suffering occurs only when you demand that impermanent things remain static; true peace arises naturally when you observe experience without grasping or resistance.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Living Dhamma"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "living-forward-a-proven-plan-to-stop-drifting",
    "title": "Living Forward: A Proven Plan to Stop Drifting",
    "author": "Michael Hyatt & Daniel Harkavy",
    "category": "Personal Growth",
    "subcategory": "Purpose & Meaning",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/14555125-M.jpg",
    "readingTimeMinutes": 50,
    "publishedYear": 2016,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop drifting along the quiet currents of circumstance and consciously architect your days from the end backwards. Living Forward provides a practical blueprint to anchor your fleeting hours to what matters most before the river runs dry.",
      "coreThesis": "Life naturally drifts into chaos and regret unless deliberately anchored by a written plan designed backwards from your ultimate legacy.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Living Forward: A Proven Plan to Stop Drifting"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "living-nonviolent-communication",
    "title": "Living Nonviolent Communication",
    "author": "Marshall B. Rosenberg",
    "category": "Communication",
    "subcategory": "Active Listening & Empathy",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2012,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Human communication operates on invisible feedback loops where moralistic judgment triggers automatic defensive resistance. This book delivers a practical diagnostic toolkit to decode emotional data, neutralize conflict, and build durable trust in any relationship.",
      "coreThesis": "All interpersonal hostility is the tragic expression of unmet universal human needs; decoding these signals transforms conflict into collaborative connection.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Living Nonviolent Communication"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "living-the-dhamma-hour-by-hour",
    "title": "Living the Dhamma Hour by Hour",
    "author": "Sayadaw U Rewata",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2012,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Liberation does not hide on remote mountain peaks or require abandoning ordinary life. This guide shows how to convert every standard hour of work, conversation, and routine into steady, unshakable inner peace.",
      "coreThesis": "Awakening is not an event waiting in the future, but the direct practice of keeping awareness clean and non-reactive through the ordinary hours of everyday life.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Living the Dhamma Hour by Hour"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "logic-a-very-short-introduction",
    "title": "Logic: A Very Short Introduction",
    "author": "Graham Priest",
    "category": "Creativity & Expression",
    "subcategory": "Logic, Rhetoric & Argument",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/120222-M.jpg",
    "readingTimeMinutes": 70,
    "publishedYear": 2000,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Think of logic not as dry schoolroom rules, but as the hidden structural physics behind every argument and decision. Graham Priest peels back everyday language to reveal the fascinating, mind-bending gearwork that determines whether our conclusions actually hold water.",
      "coreThesis": "Logic is the foundational plumbing of human thought, providing formal tools to test whether conclusions genuinely follow from premises across certainty, uncertainty, and paradox.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Logic: A Very Short Introduction"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "logically-fallacious",
    "title": "Logically Fallacious",
    "author": "Bo Bennett",
    "category": "Creativity & Expression",
    "subcategory": "Logic, Rhetoric & Argument",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10433957-M.jpg",
    "readingTimeMinutes": 70,
    "publishedYear": 2012,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Think of human conversation like a complex engine: when it sputters, a hidden reasoning defect is usually jamming the gears. 'Logically Fallacious' serves as an x-ray diagnostic manual that exposes over 300 structural flaws in human argument, equipping you to spot faulty wiring and think with scientific precision.",
      "coreThesis": "An argument is a physical structure whose integrity depends entirely on valid connections between premises and conclusions; identifying predictable fallacy patterns allows us to dismantle deceptive claims and rebuild our own reasoning on bedrock evidence.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Logically Fallacious"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "lost-art-of-listening-how-learning-to-listen-can-improve-rel",
    "title": "Lost Art of Listening: How Learning to Listen Can Improve Relationships",
    "author": "Michael P. Nichols & Martha B. Straus",
    "category": "Communication",
    "subcategory": "Active Listening & Empathy",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/697804-M.jpg",
    "readingTimeMinutes": 65,
    "publishedYear": 2021,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Human communication operates like a high-voltage electrical grid: without a dedicated receiver, conversational energy backfires into destructive defensive sparks. This book reveals the hidden psychological circuitry of listening\\u2014showing why our brains instinctively scramble to defend ourselves, and how deliberate receptive attention transforms conflict into deep interpersonal resonance.",
      "coreThesis": "Genuine listening is not a passive biological recording, but a disciplined psychological choice to temporarily quiet our own defensive ego so another person feels profoundly witnessed and emotionally safe.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Lost Art of Listening: How Learning to Listen Can Improve Relationships"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "lost-connections-uncovering-the-real-causes-of-depression",
    "title": "Lost Connections: Uncovering the Real Causes of Depression",
    "author": "Johann Hari",
    "category": "Psychology",
    "subcategory": "Mental Health & Healing",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8838533-M.jpg",
    "readingTimeMinutes": 110,
    "publishedYear": 2018,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Depression and anxiety are not defective brain hardware; they are precision biological warning lights signaling that essential human needs have been unplugged. Discover the hidden social feedback loops driving our emotional collapse and the concrete systems required to plug ourselves back into a living world.",
      "coreThesis": "Depression is not a mechanical malfunction of broken brain chemistry, but an intelligent, natural alarm system alerting us that our fundamental biological and social needs remain unmet.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Lost Connections: Uncovering the Real Causes of Depression"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "make-it-stick-the-science-of-successful-learning",
    "title": "Make It Stick: The Science of Successful Learning",
    "author": "Peter C. Brown, Henry L. Roediger III, Mark A. McDaniel",
    "category": "Productivity",
    "subcategory": "Speed Reading & Learning",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8188891-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2014,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop wasting hours on passive rereading and unlock effortless, lifelong mastery. Transform friction into momentum by training your mind like an elite athlete.",
      "coreThesis": "Durable learning requires effortful mental retrieval and spaced variety. When retention feels challenging, your brain builds permanent neural architecture.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Make It Stick: The Science of Successful Learning"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "make-time-how-to-focus-on-what-matters-every-day",
    "title": "Make Time: How to Focus on What Matters Every Day",
    "author": "Jake Knapp & John Zeratsky",
    "category": "Productivity",
    "subcategory": "Daily Systems & Workflows",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/14179816-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2018,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop running on automatic pilot: reclaim your day by designing smart defaults around a single meaningful highlight instead of racing through an endless to-do list.",
      "coreThesis": "You do not need more hours in the day; you need to reclaim your agency by picking one daily focal point and redesigning your environment so distractions lose by default.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Make Time: How to Focus on What Matters Every Day"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "man-and-his-symbols",
    "title": "Man and His Symbols",
    "author": "Carl G. Jung",
    "category": "Psychology",
    "subcategory": "Personality & Shadow Work",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/6534585-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 1964,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your rational mind is merely the dashboard of a massive submarine operating in deep, uncharted waters. By learning to read the symbolic dials and dream signals of your unconscious, you unlock a hidden operating manual for personal balance and authentic growth.",
      "coreThesis": "Human reason alone cannot navigate the complexities of life; true psychological health and maturity require deciphering and integrating the symbolic wisdom generated by our deeper unconscious mind.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Man and His Symbols"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "man-s-search-for-meaning",
    "title": "Man\\u2019s Search for Meaning",
    "author": "Viktor E. Frankl",
    "category": "Personal Growth",
    "subcategory": "Overcoming Trauma & Adversity",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1946,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "When external circumstances strip away every comfort and freedom, your ultimate power is how you interpret what is happening. By finding a concrete purpose to serve, you unlock an inner resilience that no hardship can extinguish.",
      "coreThesis": "Forces beyond your control can take away almost everything you possess except one thing: your freedom to choose how you will respond to the situation.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Man\\u2019s Search for Meaning"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "manual-of-buddhist-vipassana-practice",
    "title": "Manual of Buddhist Vipassana Practice",
    "author": "Sayadaw U Pannathami",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2002,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Step into your own mind like a calm master craftsman inspecting raw materials, discovering that suffering ends the moment you observe life exactly as it unfolds without clinging or recoil.",
      "coreThesis": "Suffering is maintained solely by your unconscious habit of reacting to sensations; by neutrally noting experiences as they arise and pass away, you realize non-self and attain peace.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Manual of Buddhist Vipassana Practice"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "manual-of-insight",
    "title": "Manual of Insight",
    "author": "Mahasi Sayadaw",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2016,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Think of your conscious mind as a high-speed operating system running layered simulations over raw sensory data. Manual of Insight serves as the definitive engineering teardown and laboratory manual for debugging that simulation in real time to reveal reality as it actually is.",
      "coreThesis": "The illusion of an unchanging, isolated self is simply a cognitive rendering error created by mental delay; by logging raw sensory inputs in real time, the mind exposes the ephemeral nature of all phenomena and attains unconditioned freedom.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Manual of Insight"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "meditation-instructions-for-intensive-practice",
    "title": "Meditation Instructions for Intensive Practice",
    "author": "Sayadaw U Silananda",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1990,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "A surgical, field-tested manual for stripping away mental noise and discovering reality as it actually unfolds moment by moment. Sayadaw U Silananda provides a transparent blueprint to turn every physical sensation and wandering thought into pure insight.",
      "coreThesis": "Suffering stems from blindly identifying with fleeting sensations and thoughts; sustained, non-judgmental labeling of current experience directly reveals the impersonal, impermanent nature of reality, bringing immediate mental freedom.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Meditation Instructions for Intensive Practice"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "meditation-on-the-mind-mindful-watching-of-thoughts",
    "title": "Meditation on the Mind: Mindful Watching of Thoughts",
    "author": "Bhikkhu Analayo",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/7003017-M.jpg",
    "readingTimeMinutes": 75,
    "publishedYear": 2003,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Step into the control room of your own consciousness and watch how thoughts, reactions, and identities are constructed in real time. Bhikkhu An\\u0101layo delivers a masterclass in contemplative reverse-engineering, turning mindfulness into a precision instrument that dissolves cognitive noise without fighting it.",
      "coreThesis": "You are not the internal narrative streaming through your head, but the unmoving awareness in which that stream flows. By observing mental states with mirror-like impartiality, psychological reactivity naturally starves from lack of fuel.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Meditation on the Mind: Mindful Watching of Thoughts"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "meditations-1-dhamma-talks",
    "title": "Meditations 1: Dhamma Talks",
    "author": "Thanissaro Bhikkhu",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 200,
    "publishedYear": 2003,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Meditation is not a passive mental spa; it is a master craft of inner engineering. Thanissaro Bhikkhu offers forty direct, practical field-talks that show you how to use breath, ethics, and relentless discernment to liberate the mind from self-inflicted friction.",
      "coreThesis": "Suffering is not an inescapable fate imposed by the world, but an unskillful internal fabrication that dissolves completely when the mind masters the craft of breath awareness, ethical restraint, and lucid discernment.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Meditations 1: Dhamma Talks"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "meditations-2-dhamma-talks",
    "title": "Meditations 2: Dhamma Talks",
    "author": "Thanissaro Bhikkhu",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 200,
    "publishedYear": 2006,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop treating meditation as passive escape; treat it as master craftsmanship. These evening talks show you how to forge the breath into a portable sanctuary of unshakable clarity in an unruly world.",
      "coreThesis": "Suffering is not an inevitable fact of life, but an unskillful habit that dissolves when the mind actively cultivates breath-centered stillness and razor-sharp discernment.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Meditations 2: Dhamma Talks"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "meditations-3-dhamma-talks",
    "title": "Meditations 3: Dhamma Talks",
    "author": "Thanissaro Bhikkhu",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 230,
    "publishedYear": 2006,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Meditations 3 cuts through misty spiritual romanticism to reveal meditation as a master artisan's craft\\u2014training you to use the physical breath to dismantle self-inflicted distress and discover unconditioned freedom.",
      "coreThesis": "Genuine peace is an active, trainable craft: by mastering breath energy and disarming reactive perceptions, you dissolve internal friction and awaken to an unconditioned freedom right where you are.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Meditations 3: Dhamma Talks"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "meditations-4-dhamma-talks",
    "title": "Meditations 4: Dhamma Talks",
    "author": "Thanissaro Bhikkhu",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 210,
    "publishedYear": 2008,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop treating meditation as a passive zoning-out exercise and start practicing it as an exacting, hands-on craft. Thanissaro Bhikkhu delivers a direct masterclass on tuning breath energy and mastering mental intentions to achieve unshakable inner freedom.",
      "coreThesis": "Suffering is not an inescapable fate or a fixed identity, but an active misstep in how we manufacture our experience. By training awareness through full-body breath mastery and ethical discernment, we systematically dismantle craving and awaken to unconditioned peace.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Meditations 4: Dhamma Talks"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "meditations-5-dhamma-talks",
    "title": "Meditations 5: Dhamma Talks",
    "author": "Thanissaro Bhikkhu",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 210,
    "publishedYear": 2010,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Meditation is not passive zoning out or escaping the world; it is precision craftwork that trains you to master your own attention, dissolve reactive stress, and build an unshakable inner refuge.",
      "coreThesis": "Suffering is an active, ongoing fabrication that you unknowingly manufacture; by learning the practical craft of breath meditation and clear self-observation, you can dismantle that fabrication and discover an unconditional, blameless peace.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Meditations 5: Dhamma Talks"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "meditations",
    "title": "Meditations",
    "author": "Marcus Aurelius",
    "category": "Philosophy",
    "subcategory": "Stoicism & Ancient Wisdom",
    "coverColor": "from-amber-700 to-stone-900",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/211529-M.jpg",
    "readingTimeMinutes": 60,
    "publishedYear": 180,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your peace does not depend on a chaotic world falling into line. It blooms when you master the small quiet sanctuary of your own mind.",
      "coreThesis": "You possess sovereign authority over your judgments, desires, and actions. Master your inner thoughts, and no external storm can breach your serenity.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Meditations"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Core Insights"
    ]
  },
  {
    "id": "meeting-the-shadow-the-hidden-power-of-the-dark-side-of-huma",
    "title": "Meeting the Shadow: The Hidden Power of the Dark Side of Human Nature",
    "author": "Connie Zweig & Jeremiah Abrams",
    "category": "Psychology",
    "subcategory": "Personality & Shadow Work",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/666068-M.jpg",
    "readingTimeMinutes": 325,
    "publishedYear": 1991,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your disowned weaknesses do not vanish just because you ignore them; they operate in the dark, hijacking your decisions and sabotaging your relationships. Integrating your shadow transforms hidden liabilities into your sharpest competitive advantages.",
      "coreThesis": "Wholeness, not moral perfection, is the prerequisite for sanity and effective execution. The parts of yourself you refuse to own will inevitably own you.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Meeting the Shadow: The Hidden Power of the Dark Side of Human Nature"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "memories-dreams-reflections",
    "title": "Memories, Dreams, Reflections",
    "author": "Carl G. Jung",
    "category": "Psychology",
    "subcategory": "Personality & Shadow Work",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/6364-M.jpg",
    "readingTimeMinutes": 60,
    "publishedYear": 1961,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "What if your conscious mind is just a tiny boat floating on a vast, ancient ocean of instincts and shared symbols? Carl Jung takes you behind the curtain of his own mind to reveal how excavating your hidden thoughts turns life from a chaotic storm into an integrated masterpiece.",
      "coreThesis": "Your conscious ego is only a fraction of who you are; true psychological maturity requires courageously exploring, understanding, and integrating the vast unconscious depths of your mind.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Memories, Dreams, Reflections"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "methods-of-persuasion",
    "title": "Methods of Persuasion",
    "author": "Nick Kolenda",
    "category": "Sales & Persuasion",
    "subcategory": "Persuasion & Influence",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10190607-M.jpg",
    "readingTimeMinutes": 70,
    "publishedYear": 2013,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Decisions are rarely made in the moment of choice; they are quietly engineered long before the question is even asked. Nick Kolenda reveals the hidden psychological assembly line that shapes human compliance from the shadows.",
      "coreThesis": "Human decisions are governed by subconscious associative networks, meaning genuine persuasion occurs by engineering the environment and mindset long before the formal ask is ever delivered.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Methods of Persuasion"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "mind-like-fire-unbound",
    "title": "Mind Like Fire Unbound",
    "author": "Thanissaro Bhikkhu",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1993,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Nibbana does not mean annihilation or going dark into nothingness; it means radical, cooling release. When you understand how an ancient flame lets go of its fuel, you uncover the direct, practical path to unbinding your own mind.",
      "coreThesis": "Suffering is an active process sustained solely by what the mind clings to; withdraw the fuel, and consciousness naturally cools into unconfined, timeless freedom.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Mind Like Fire Unbound"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "mind-over-mood",
    "title": "Mind Over Mood",
    "author": "Dennis Greenberger & Christine A. Padesky",
    "category": "Psychology",
    "subcategory": "Human Behavior",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/7419817-M.jpg",
    "readingTimeMinutes": 80,
    "publishedYear": 1995,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your moods do not originate from external circumstances, but from the rapid interpretations running through your mind. By treating thoughts like testable hypotheses rather than absolute truths, you can rewire persistent emotional feedback loops.",
      "coreThesis": "Emotions are produced not by life events, but by how we interpret them; systematically examining and balancing automatic thoughts reclaims control over emotional and behavioral patterns.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Mind Over Mood"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "mindfully-facing-disease-and-death",
    "title": "Mindfully Facing Disease and Death",
    "author": "Bhikkhu Analayo",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 120,
    "publishedYear": 2016,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "What if severe illness and physical mortality are not biological failures to run from, but the ultimate diagnostic laboratory for radical inner freedom? Bhikkhu Analayo decodes early Buddhist psychology into a precise, systematic operating manual for training the mind to remain calm, clear, and utterly fear-free\\u2014even as the physical body breaks down.",
      "coreThesis": "Physical pain and biological mortality are natural, non-negotiable parameters of physical existence, but psychological suffering is an optional secondary feedback loop that completely dissolves when consciousness uncouples from bodily ownership.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Mindfully Facing Disease and Death"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "mindfulness-bliss-and-beyond-a-meditator-s-handbook",
    "title": "Mindfulness, Bliss, and Beyond: A Meditator's Handbook",
    "author": "Ajahn Brahm",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 65,
    "publishedYear": 2006,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Meditation is not a grim endurance test of force, but the art of letting go until the mind settles into profound stillness, radiant bliss, and liberating insight.",
      "coreThesis": "Deep peace and liberating wisdom arise not from willful control, but from the radical relinquishment of doing, allowing the mind to rest in its natural state of effortless stillness and radiant joy.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Mindfulness, Bliss, and Beyond: A Meditator's Handbook"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "mindfulness-of-breathing-a-practice-guide-and-translations",
    "title": "Mindfulness of Breathing: A Practice Guide and Translations",
    "author": "Bhikkhu Analayo",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/5239104-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2019,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Think of your breath not as a passive background hum, but as an interactive dashboard for your autonomic nervous system and conscious mind. Bhikkhu An\\u0101layo decodes the ancient 16-step breath protocol into a clean, systematic feedback loop that recalibrates physiological stress, emotional reactivity, and mental fixation.",
      "coreThesis": "The breath is a bidirectional control dial linking body and consciousness; methodically observing its changing nuances systematically recalibrates neural arousal, deconstructs reactive self-referential habits, and reveals the fluid non-dual nature of immediate experience.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Mindfulness of Breathing: A Practice Guide and Translations"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "mindfulness-of-the-body-the-first-foundation",
    "title": "Mindfulness of the Body: The First Foundation",
    "author": "Bhikkhu Analayo",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2003,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your physical body is not just a biological vehicle; it is the master instrument board and primary anchor for mental freedom. Bhikkhu An\\u0101layo reveals how tuning directly into somatic mechanics systematically dissolves chronic stress, mental rumination, and existential confusion.",
      "coreThesis": "Grounding sustained awareness directly in the physical body breaks the feedback loop of compulsive mental storytelling and exposes the fluid, ungraspable nature of all lived experience.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Mindfulness of the Body: The First Foundation"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "mindfulness-the-path-to-the-deathless",
    "title": "Mindfulness: The Path to the Deathless",
    "author": "Ajahn Sumedho",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 60,
    "publishedYear": 1985,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop trying to forcefully silence your noisy mind and instead discover the silent sky in which every storm naturally dissolves. Ajahn Sumedho reveals mindfulness not as an exhausting mental chore, but as direct, effortless resting in the unshakeable stillness behind every passing thought.",
      "coreThesis": "Suffering occurs only when we identify with passing thoughts and feelings; freedom is discovered the moment we rest in the open, unconditioned awareness that peacefully observes them.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Mindfulness: The Path to the Deathless"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "mindset-the-new-psychology-of-success",
    "title": "Mindset: The New Psychology of Success",
    "author": "Carol S. Dweck",
    "category": "Personal Growth",
    "subcategory": "Life Transitions & Reinvention",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/746414-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2006,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your brain is an adaptable muscle, not an immutable statue. Discover the hidden psychological lever that separates brittle perfectionism from limitless resilience.",
      "coreThesis": "Human potential is a dynamic capacity forged through effort and adaptive strategy, not a fixed pool of genetic talent. Believing your abilities can grow changes how you process friction, failure, and lifelong mastery.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Mindset: The New Psychology of Success"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "mini-habits",
    "title": "Mini Habits",
    "author": "Stephen Guise",
    "category": "Productivity",
    "subcategory": "Habits & Routines",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8093714-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2013,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop waiting for inspiration and start shrinking your daily actions until failure is impossible. By demanding just one push-up, one page read, or one paragraph written every day, you bypass mental friction and build permanent momentum.",
      "coreThesis": "True behavioral change does not come from superhuman motivation, but from shrinking daily actions until they are 'too small to fail,' turning consistency into an effortless reflex.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Mini Habits"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "mistakes-were-made-but-not-by-me",
    "title": "Mistakes Were Made (But Not by Me)",
    "author": "Carol Tavris & Elliot Aronson",
    "category": "Psychology",
    "subcategory": "Social Psychology",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/1119860-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2007,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "We are rarely deliberate liars; instead, our brains run an automated PR department that rewrites reality to protect our fragile egos. Tavris and Aronson reveal the invisible mental gears that turn honest errors into entrenched delusions\\u2014and show us how to break the cycle.",
      "coreThesis": "Self-justification is not deliberate deceit, but an unconscious defense mechanism driven by cognitive dissonance that blinds us to our blunders and polarizes our relationships.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Mistakes Were Made (But Not by Me)"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "moonwalking-with-einstein",
    "title": "Moonwalking with Einstein",
    "author": "Joshua Foer",
    "category": "Productivity",
    "subcategory": "Speed Reading & Learning",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/14426425-M.jpg",
    "readingTimeMinutes": 55,
    "publishedYear": 2011,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Great memory is not a genetic gift reserved for savants. It is an ancient mechanical art anyone can deliberately rebuild.",
      "coreThesis": "Extraordinary memory is an acquired athletic skill rooted in human evolutionary biology rather than innate biological genius.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Moonwalking with Einstein"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "negotiating-the-nonnegotiable-how-to-resolve-your-most-emoti",
    "title": "Negotiating the Nonnegotiable: How to Resolve Your Most Emotionally Charged Conflicts",
    "author": "Daniel Shapiro",
    "category": "Sales & Persuasion",
    "subcategory": "Persuasion & Influence",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8908235-M.jpg",
    "readingTimeMinutes": 75,
    "publishedYear": 2016,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "When arguments turn bitter, we stop fighting over practical solutions and start defending our survival as a self. Daniel Shapiro reveals the hidden psychological tripwires that pull us into tribal warfare and provides a surgical toolkit to defuse explosive emotional conflicts.",
      "coreThesis": "Deep conflict is rarely about the surface issue; it is a primal fight to defend threatened identity against emotional lures that hijack rational thought.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Negotiating the Nonnegotiable: How to Resolve Your Most Emotionally Charged Conflicts"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "negotiation-genius",
    "title": "Negotiation Genius",
    "author": "Deepak Malhotra & Max H. Bazerman",
    "category": "Sales & Persuasion",
    "subcategory": "Persuasion & Influence",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/374240-M.jpg",
    "readingTimeMinutes": 70,
    "publishedYear": 2007,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Negotiation is not a bar brawl or a mystical charisma contest; it is an investigative science of discovering hidden value and outsmarting cognitive biases. By shifting from aggressive posturing to diagnostic inquiry, you turn conflict into high-yield problem solving.",
      "coreThesis": "Brilliant outcomes come from treating negotiation as an investigative discipline that methodically uncovers hidden constraints, trades non-competing priorities, and mitigates universal psychological biases.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Negotiation Genius"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Sales & Persuasion",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "never-split-the-difference-negotiating-as-if-your-life-depen",
    "title": "Never Split the Difference: Negotiating As If Your Life Depended On It",
    "author": "Chris Voss with Tahl Raz",
    "category": "Sales & Persuasion",
    "subcategory": "Persuasion & Influence",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8365942-M.jpg",
    "readingTimeMinutes": 50,
    "publishedYear": 2016,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Negotiation is not a mathematical equation or a polite battle of logic; it is an exercise in emotional navigation. By learning how the human brain actually processes risk and trust, you can steer high-stakes conversations with surgical calm.",
      "coreThesis": "Human beings are fundamentally emotional, irrational, and defensive; lasting agreement happens only when you disarm their threat circuitry through tactical empathy and let them feel in total control.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Never Split the Difference: Negotiating As If Your Life Depended On It"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "no-ajahn-chah-reflections-of-a-master",
    "title": "No Ajahn Chah: Reflections of a Master",
    "author": "Ajahn Chah",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 75,
    "publishedYear": 1994,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop wrestling with reality: true peace is not the absence of storms, but the wisdom to leave the heart unhooked. In short, razor-sharp reflections, Thai forest master Ajahn Chah strips spirituality down to practical, unshakeable stillness.",
      "coreThesis": "Suffering is born from resisting change and grasping at what cannot be held; when you release attachment to outcomes and self-image, unconditioned peace is already present.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "No Ajahn Chah: Reflections of a Master"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "no-bad-parts-healing-trauma-and-restoring-wholeness-with-the",
    "title": "No Bad Parts: Healing Trauma and Restoring Wholeness with the Internal Family Systems Model",
    "author": "Richard C. Schwartz",
    "category": "Psychology",
    "subcategory": "Personality & Shadow Work",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10881934-M.jpg",
    "readingTimeMinutes": 55,
    "publishedYear": 2021,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your mind is not a single monolith but a dynamic internal crew where no bad members exist\\u2014only wounded specialists stuck in extreme survival roles. Learn how to step into the conductor's seat and lead your inner system with clarity, calm, and confidence.",
      "coreThesis": "The human mind is a naturally multiple system of protective parts gathered around an indestructible core Self; lasting healing happens not by exiling difficult impulses, but by leading them with curious, compassionate self-awareness.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "No Bad Parts: Healing Trauma and Restoring Wholeness with the Internal Family Systems Model"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "no-hard-feelings-the-secret-power-of-embracing-emotions-at-w",
    "title": "No Hard Feelings: The Secret Power of Embracing Emotions at Work",
    "author": "Liz Fosslien & Mollie West Duffy",
    "category": "Communication",
    "subcategory": "Remote & Digital Communication",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10155114-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2019,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Emotions are not operational errors; they are vital telemetry. Learn to calibrate, communicate, and channel feelings like a precision instrument to protect focus, eliminate misfires, and outexecute the competition.",
      "coreThesis": "Emotions are informational signals rather than operational directives; organizations that systematically decode and regulate them gain an unassailable advantage in team velocity, decision quality, and operational resilience.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "No Hard Feelings: The Secret Power of Embracing Emotions at Work"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "no-more-mr-nice-guy",
    "title": "No More Mr. Nice Guy",
    "author": "Robert A. Glover",
    "category": "Personal Growth",
    "subcategory": "Authenticity & Self-Worth",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/513564-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2003,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Beneath compulsive agreeableness lies a covert behavioral circuit built on shame, hidden demands, and quiet resentment. Uncover the subtle machinery of people-pleasing and rewire your operating system for grounded, uncompromising authenticity.",
      "coreThesis": "Trying to control the world through pleasing others is an exhausting, manipulative defense mechanism; genuine confidence emerges only when you own your needs, accept friction, and validate yourself.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "No More Mr. Nice Guy"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "noble-strategy-essays-on-the-buddhist-path",
    "title": "Noble Strategy: Essays on the Buddhist Path",
    "author": "Thanissaro Bhikkhu",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 60,
    "publishedYear": 1999,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Buddhism is not a passive philosophy of mere acceptance, but an empowering master craft for training the mind toward total emotional freedom. Thanissaro Bhikkhu reveals the Dhamma as a pragmatic, noble strategy where every intention becomes a skillful tool to dismantle suffering.",
      "coreThesis": "The spiritual path is a deliberate, skillful strategy of action that transforms present intention, using ethical clarity and focused awareness to unbind the heart from all suffering.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Noble Strategy: Essays on the Buddhist Path"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "nonviolent-communication-a-language-of-life",
    "title": "Nonviolent Communication: A Language of Life",
    "author": "Marshall B. Rosenberg",
    "category": "Communication",
    "subcategory": "Active Listening & Empathy",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/940686-M.jpg",
    "readingTimeMinutes": 70,
    "publishedYear": 1999,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Human conflict is rarely a clash of incompatible people\\u2014it is a signaling failure between shared human needs. This book reveals the hidden psychological wiring of conversation, offering a precise operating system to defuse defensive triggers and build real cooperation.",
      "coreThesis": "Behind every sharp judgment and defensive reaction lies a universal human need struggling to be heard. When we separate clear observations from evaluations and state concrete needs rather than demands, conflict naturally dissolves into collaboration.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Nonviolent Communication: A Language of Life"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "not-nice-stop-people-pleasing-staying-silent-feeling-guilty",
    "title": "Not Nice: Stop People Pleasing, Staying Silent, & Feeling Guilty",
    "author": "Aziz Gazipura",
    "category": "Personal Growth",
    "subcategory": "Authenticity & Self-Worth",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/12364378-M.jpg",
    "readingTimeMinutes": 75,
    "publishedYear": 2017,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Compulsive niceness is not a moral virtue; it is an anxiety-fueled defense mechanism that trades authentic connection for temporary conflict avoidance. Dr. Aziz Gazipura reverse-engineers the psychology of people-pleasing and provides a systematic training manual for asserting boundaries, tolerating social friction, and reclaiming autonomy.",
      "coreThesis": "Niceness is fear-based compliance masquerading as virtue; genuine self-respect and lasting relationships require speaking directly, enforcing boundaries, and enduring the temporary discomfort of other people's disapproval.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Not Nice: Stop People Pleasing, Staying Silent, & Feeling Guilty"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "now-is-the-knowing",
    "title": "Now Is the Knowing",
    "author": "Ajahn Sumedho",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1989,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Yesterday is a memory and tomorrow is the unknown\\u2014peace begins the moment you stop fighting your experience and rest in direct awareness right now. Ajahn Sumedho reveals how stepping back from mental chatter uncovers an unshakeable clarity that is already present.",
      "coreThesis": "Suffering is born from identifying with transient mental states; enduring peace emerges when you rest as the knowing witness of all arising and passing phenomena.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Now Is the Knowing"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "nudge",
    "title": "Nudge",
    "author": "Richard H. Thaler & Cass R. Sunstein",
    "category": "Psychology",
    "subcategory": "Decision Making",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/6402116-M.jpg",
    "readingTimeMinutes": 75,
    "publishedYear": 2008,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Small environmental tweaks hold enormous power over the choices you make every day. By redesigning subtle defaults, we can steer better decisions without banning a single alternative.",
      "coreThesis": "Human decisions are heavily steered by environmental cues, so designing thoughtful defaults helps people choose better without restricting their freedom.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Nudge"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "on-love-dhamma-talks-on-metta",
    "title": "On Love: Dhamma Talks on Metta",
    "author": "Ajahn Jayasaro",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2010,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Most suffering in relationships comes from confusing love with possessive clinging. In this lucid discourse, Ajahn Jayasaro reveals how unhooking goodwill from attachment transforms love from an anxious transaction into a boundless, freeing refuge.",
      "coreThesis": "Genuine love is not an anxious desire to possess another person, but the purified, unconditional wish for their true well-being, freed from craving and grounded in wisdom.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "On Love: Dhamma Talks on Metta"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "on-the-path-an-anthology-of-suttas-on-the-noble-eightfold-path",
    "title": "On the Path: An Anthology of Suttas on the Noble Eightfold Path",
    "author": "Thanissaro Bhikkhu",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 50,
    "publishedYear": 2017,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Suffering is not a permanent trap, but a practical problem with an exact, hands-on mechanical solution. Thanissaro Bhikkhu curates the Buddha's original operating manual to show how deliberate ethical discipline, focused awareness, and meditative stillness assemble a reliable craft for total spiritual freedom.",
      "coreThesis": "The Noble Eightfold Path is a deliberate, pragmatic training program that transforms how you generate intention, turning every action, thought, and breath into a direct vehicle toward the unconditioned peace of liberation.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "On the Path: An Anthology of Suttas on the Noble Eightfold Path"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "on-the-path-to-freedom",
    "title": "On the Path to Freedom",
    "author": "Sayadaw U Pandita",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1995,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Real freedom is not an exotic escape; it is waking up from the mental fog of identification and seeing reality with surgical clarity. Sayadaw U Pandita delivers an uncompromising, practical blueprint for deconstructing suffering and mastering your own mind in real time.",
      "coreThesis": "Suffering dissolves when continuous, precise awareness observes sensory experience directly, dismantling the false assumption of a solid, independent self.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "On the Path to Freedom"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "one-small-step-can-change-your-life-the-kaizen-way",
    "title": "One Small Step Can Change Your Life: The Kaizen Way",
    "author": "Robert Maurer",
    "category": "Productivity",
    "subcategory": "Habits & Routines",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/507718-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2004,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Big radical goals trigger hardwired neurological alarm bells that lock us into freeze, fear, and procrastination. By shrinking ambitions down to absurdly effortless micro-actions, Kaizen silently sneaks past the brain's defense perimeter to engineer effortless lifelong transformation.",
      "coreThesis": "Radical change triggers our brain's innate biological resistance, whereas ridiculously tiny micro-steps bypass neural alarm systems to foster effortless, compounding transformation.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "One Small Step Can Change Your Life: The Kaizen Way"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "opening-the-door-of-your-heart",
    "title": "Opening the Door of Your Heart",
    "author": "Ajahn Brahm",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 55,
    "publishedYear": 2004,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Life drops unexpected truckloads of mess at your doorstep, but you don't have to carry the stench inside. Through disarming wit and profound mindfulness parables, Ajahn Brahm shows how opening the door of your heart to messy reality turns life's hardest moments into rich fertilizer for abiding peace.",
      "coreThesis": "Suffering does not come from painful events, but from our internal resistance to them; when you unconditionally welcome reality with patience, compassion, and open-hearted awareness, life's worst manure transforms into the fertilizer of wisdom.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Opening the Door of Your Heart"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "our-real-home-teachings-for-approaching-death",
    "title": "Our Real Home: Teachings for Approaching Death",
    "author": "Ajahn Chah",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1987,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your physical body is a borrowed shelter that will inevitably crumble\\u2014peace comes not from fighting the wreckage, but from discovering the timeless awareness that was never born and cannot die.",
      "coreThesis": "The physical body is merely borrowed matter bound for decay; our real home is the clear, unattached mind resting in peaceful awareness.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Our Real Home: Teachings for Approaching Death"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "outlive-the-science-and-art-of-longevity",
    "title": "Outlive: The Science and Art of Longevity",
    "author": "Peter Attia with Bill Gifford",
    "category": "Health & Longevity",
    "subcategory": "Nutrition & Metabolism",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/13191259-M.jpg",
    "readingTimeMinutes": 85,
    "publishedYear": 2023,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop waiting for the check-engine light to flash on your body before taking action. Outlive reveals how to overhaul your biological engine decades before breakdown occurs, matching a long life with peak physical vitality and mental sharpness.",
      "coreThesis": "True longevity requires shifting from reactive treatment to proactive prevention decades before symptoms arise, pairing cardiovascular fitness, muscle stability, metabolic health, and emotional resilience to safeguard healthspan alongside lifespan.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Outlive: The Science and Art of Longevity"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Finance",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "overcoming-destructive-anger",
    "title": "Overcoming Destructive Anger",
    "author": "Albert Ellis",
    "category": "Psychology",
    "subcategory": "Mental Health & Healing",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 70,
    "publishedYear": 1977,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Anger is not a chemical surge forced upon you by bad drivers, broken appliances, or unfair bosses\\u2014it is an internal interpretation error. Master the hidden cognitive code behind your reactions, and you can switch off the internal furnace whenever life goes off script.",
      "coreThesis": "External events and difficult people do not make you angry; you anger yourself by converting flexible preferences into rigid, dogmatic demands on reality.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Overcoming Destructive Anger"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "overcoming-gravity",
    "title": "Overcoming Gravity",
    "author": "Steven Low",
    "category": "Health & Longevity",
    "subcategory": "Fitness & Strength",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8744712-M.jpg",
    "readingTimeMinutes": 130,
    "publishedYear": 2016,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your skeleton is a system of adjustable levers, and gravity is a constant gravitational field waiting to be mastered. Steven Low decodes bodyweight strength into an exact engineering science, showing you how to build elite, injury-proof physical power without ever stepping foot into a commercial gym.",
      "coreThesis": "Bodyweight strength is not an unpredictable art; it is Newtonian physics and cellular biology applied to human levers, where manipulating mechanical advantage builds elite power and durable connective tissue.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Overcoming Gravity"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Finance",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "owning-your-own-shadow",
    "title": "Owning Your Own Shadow",
    "author": "Robert A. Johnson",
    "category": "Psychology",
    "subcategory": "Personality & Shadow Work",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/4037954-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 1991,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Think of your personality like a well-lit home where half the rooms were locked and darkened to look neat for the neighbors. Robert A. Johnson gives you the master key to reopen the basement, reclaim your trapped vitality, and achieve true psychological wholeness.",
      "coreThesis": "Wholeness requires integrating both the light and dark aspects of human nature. Whatever we disown does not disappear; it rules us from behind the scenes until we consciously claim it.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Owning Your Own Shadow"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "parami-ways-to-cross-life-s-floats",
    "title": "Parami: Ways to Cross Life's Floats",
    "author": "Ajahn Sucitto",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 55,
    "publishedYear": 2012,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "When life's relentless demands threaten to pull you under, spiritual practice is not an abstract theory\\u2014it is a dependable raft built from daily virtues. Ajahn Sucitto demonstrates how ten classical inner qualities transform everyday stress into clear, grounded spiritual freedom.",
      "coreThesis": "Enlightenment is built not through extraordinary feats, but by consistently cultivating ten grounded, everyday virtues that carry the mind across the turbulent currents of reactivity to lasting peace.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Parami: Ways to Cross Life's Floats"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "peace-beyond-suffering",
    "title": "Peace Beyond Suffering",
    "author": "Ajahn Chah",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1980,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Suffering does not come from the noisy world around you; it comes entirely from clutching things that change. Ajahn Chah hands you the plain, practical wisdom to put down the heavy rock you never realized you were carrying.",
      "coreThesis": "Suffering occurs only when the mind grasps and resists reality; absolute peace appears the moment you open your hands and let experience flow without clinging.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Peace Beyond Suffering"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "peace-is-a-dynamic-process",
    "title": "Peace Is a Dynamic Process",
    "author": "Ajahn Sumedho",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 60,
    "publishedYear": 2014,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Peace is not a static retirement home where life stops moving; it is learning how to ride a bicycle smoothly across uneven ground. Master monk Ajahn Sumedho reveals how direct awareness transforms daily emotional chaos into grounded, unshakeable freedom.",
      "coreThesis": "Peace is not the total absence of life's friction, but the active, unconditioned awareness that holds every shifting condition without clinging.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Peace Is a Dynamic Process"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "peak-performance",
    "title": "Peak Performance",
    "author": "Brad Stulberg & Steve Magness",
    "category": "Productivity",
    "subcategory": "Energy & Burnout",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10858619-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2017,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "World-class performance isn't about nonstop grinding\\u2014it is about cycling smart stress with aggressive recovery. Master the science of deliberate strain, strategic rest, and purpose-driven focus to achieve elite results without burning out.",
      "coreThesis": "Sustainable peak performance across any domain follows a universal biological truth: Stress + Rest = Growth.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Peak Performance"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "permission-to-feel",
    "title": "Permission to Feel",
    "author": "Marc Brackett",
    "category": "Psychology",
    "subcategory": "Emotional Intelligence",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8781091-M.jpg",
    "readingTimeMinutes": 55,
    "publishedYear": 2019,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Emotions are not irrational glitches to suppress\\u2014they are high-fidelity biometric data streams. By shifting from a defensive emotion judge to an inquisitive emotion scientist, you unlock the exact operating system required to navigate pressure, master self-regulation, and lead effectively.",
      "coreThesis": "Emotions are vital biometric data, not character flaws; when we cultivate the scientific discipline to recognize, name, and regulate our internal states, we regain sovereign control over our cognitive choices and relational systems.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Permission to Feel"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "perspectives-on-satipatthana",
    "title": "Perspectives on Satipatthana",
    "author": "Bhikkhu Analayo",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 65,
    "publishedYear": 2013,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Think of human awareness as sophisticated dashboard software for navigating reality. Bhikkhu Analayo reverse-engineers early mindfulness manuals to reveal how systematically monitoring your body, feelings, mind states, and mental patterns rewires cognitive reactivity into absolute clarity.",
      "coreThesis": "Mindfulness is an open, receptive observational system that decouples raw experience from automatic emotional reactivity, transforming reactive suffering into lucid comprehension.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Perspectives on Satipatthana"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "pivot-the-only-move-that-matters-is-your-next-one",
    "title": "Pivot: The Only Move That Matters Is Your Next One",
    "author": "Jenny Blake",
    "category": "Personal Growth",
    "subcategory": "Life Transitions & Reinvention",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/7940358-M.jpg",
    "readingTimeMinutes": 60,
    "publishedYear": 2016,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop leaping off career cliffs in blind panic\\u2014career reinvention is a deliberate, scientific cycle of planting your foundation, scanning options, testing pilots, and executing crisp launches.",
      "coreThesis": "Career reinvention is not a reckless leap into the unknown, but an intentional, agile process of building on your established strengths through small, low-risk experiments before making a full transition.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Pivot: The Only Move That Matters Is Your Next One"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "plato-s-republic-selected-dialogues",
    "title": "Plato's Republic & Selected Dialogues",
    "author": "Plato",
    "category": "Creativity & Expression",
    "subcategory": "Logic, Rhetoric & Argument",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/13021752-M.jpg",
    "readingTimeMinutes": 70,
    "publishedYear": 2020,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "What if your everyday decisions are driven by illusions on a wall, and true freedom begins only when you inspect the projector? Plato maps human psychology and social organization into a working feedback engine, showing how rigorous inquiry dismantles false confidence and builds lasting internal clarity.",
      "coreThesis": "Justice is internal harmony: when reason guides emotional drive to manage appetites, both an individual mind and an entire society run smoothly, immune to self-sabotage.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Plato's Republic & Selected Dialogues"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "poor-charlie-s-almanack",
    "title": "Poor Charlie\\u2019s Almanack",
    "author": "Charles T. Munger",
    "category": "Psychology",
    "subcategory": "Cognitive Biases & Logic",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 75,
    "publishedYear": 2005,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "You do not need brilliance to build durable wealth; you only need to avoid chronic stupidity. Master a handful of big ideas across disciplines and let compounding do the heavy lifting.",
      "coreThesis": "Durable wealth and clear judgment come from avoiding predictable human folly through multidisciplinary thinking.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Poor Charlie\\u2019s Almanack"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "power-questions-build-relationships-win-new-business-and-inf",
    "title": "Power Questions: Build Relationships, Win New Business, and Influence Others",
    "author": "Andrew Sobel & Jerold Panas",
    "category": "Communication",
    "subcategory": "Difficult Conversations",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/14617629-M.jpg",
    "readingTimeMinutes": 175,
    "publishedYear": 2012,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop pitching answers to problems you haven't diagnosed. Power Questions hands you the master key to executive dialogue\\u2014trading one-way presentations for surgical questions that reframe stakes, command boardroom trust, and win business without selling.",
      "coreThesis": "Conversational control belongs to the person asking the questions, not the one giving the answers. Tactical inquiry dismantles client defenses, uncovers unpriced risk, and positions you as a strategic partner rather than an interchangeable vendor.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Power Questions: Build Relationships, Win New Business, and Influence Others"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "practical-vipassana-meditative-exercises",
    "title": "Practical Vipassana Meditative Exercises",
    "author": "Mahasi Sayadaw",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1954,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Think of your consciousness as an operating system running millions of unexamined automated background scripts\\u2014this manual offers the precise, step-by-step diagnostic toolkit to inspect and debug them in real time. By applying simple descriptive labels to raw bodily feedback and fleeting thoughts, you strip away emotional static and discover how moment-to-moment reality actually operates.",
      "coreThesis": "Subjective suffering is caused by confusing rapid, impersonal sensory data with a fixed personal identity; systematically labeling raw sensations in real time breaks this illusion and restores baseline mental freedom.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Practical Vipassana Meditative Exercises"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "pre-suasion-a-revolutionary-way-to-influence-and-persuade",
    "title": "Pre-Suasion: A Revolutionary Way to Influence and Persuade",
    "author": "Robert B. Cialdini",
    "category": "Sales & Persuasion",
    "subcategory": "Persuasion & Influence",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/7880005-M.jpg",
    "readingTimeMinutes": 70,
    "publishedYear": 2016,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Master persuaders do not change minds with superior arguments; they change the mental landscape before making the pitch. What you focus on right before a choice quietly dictates what you decide.",
      "coreThesis": "The secret to effective persuasion lies not in what you say, but in what you place in the listener's mind immediately before you speak.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Pre-Suasion: A Revolutionary Way to Influence and Persuade"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "primal-leadership",
    "title": "Primal Leadership",
    "author": "Daniel Goleman, Richard Boyatzis, Annie McKee",
    "category": "Psychology",
    "subcategory": "Emotional Intelligence",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/834766-M.jpg",
    "readingTimeMinutes": 55,
    "publishedYear": 2002,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Great leadership is not determined by spreadsheets or strategic plans, but by human biology: leaders act as emotional thermostats whose internal state automatically synchronizes the nervous systems of everyone in the room. By mastering your emotional resonance across six distinct behavioral styles, you transform emotional contagion from an invisible hazard into your organization's ultimate competitive engine.",
      "coreThesis": "A leader's primary biological task is emotional regulation: because human nervous systems synchronize with authority figures through open-loop limbic circuitry, resonant leadership unlocks team cognition while dissonant leadership paralyzes it.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Primal Leadership"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "protection-through-satipatthana",
    "title": "Protection Through Satipatthana",
    "author": "Nyanaponika Thera",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1967,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Worldly harmony does not begin with managing others; it begins with mastering your own mind. Nyanaponika Thera shows how radical self-awareness becomes the ultimate armor for yourself and your community.",
      "coreThesis": "Protecting oneself through mindfulness safeguards the world, and protecting others through kindness safeguards oneself.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Protection Through Satipatthana"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-psychology-of-money-timeless-lessons-on-wealth-greed-and",
    "title": "The Psychology of Money",
    "author": "Morgan Housel",
    "category": "Money & Investing",
    "subcategory": "Money Psychology",
    "coverColor": "from-emerald-700 to-teal-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10389354-M.jpg",
    "readingTimeMinutes": 100,
    "publishedYear": 2020,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Doing well with money has little to do with smarts and everything to do with behavior. Financial success is not hard science; it is the quiet art of enduring survival.",
      "coreThesis": "Financial prosperity is determined by behavioral endurance and emotional restraint rather than analytical intellect. True wealth is the unspent capital that grants total autonomy over your time.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Psychology of Money"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Finance",
      "Core Insights"
    ]
  },
  {
    "id": "purification-of-mind-and-view",
    "title": "Purification of Mind and View",
    "author": "Sayadaw U Zagara",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2004,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop mistaking the turbulent weather on the surface of your life for who you actually are. This masterclass reveals how quiet concentration and razor-sharp self-observation systematically dissolve existential anxiety, leaving direct, unshakeable peace.",
      "coreThesis": "Suffering occurs when you mistake a shifting stream of physical sensations and mental habits for a permanent self; steadying the mind dismantles this illusion and reveals inherent freedom.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Purification of Mind and View"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "purity-of-heart-essays-on-the-buddhist-path",
    "title": "Purity of Heart: Essays on the Buddhist Path",
    "author": "Thanissaro Bhikkhu",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 65,
    "publishedYear": 2006,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop treating mindfulness like a spa day and discover the Buddha's true training manual: a masterclass in emotional craftsmanship, rigorous honesty, and total mental freedom.",
      "coreThesis": "Spiritual purity is not passive surrender, but an active, discerning craft: by testing intentions and refining attention, the mind unbinds itself from suffering.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Purity of Heart: Essays on the Buddhist Path"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "radical-acceptance",
    "title": "Radical Acceptance",
    "author": "Tara Brach",
    "category": "Personal Growth",
    "subcategory": "Authenticity & Self-Worth",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/7020283-M.jpg",
    "readingTimeMinutes": 60,
    "publishedYear": 2003,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Most adults spend their lives trapped in an invisible feedback loop of self-criticism, convinced they are fundamentally broken or falling short. Radical Acceptance reveals the psychological mechanics to dismantle this chronic inner friction, showing how embracing reality as it is\\u2014without judgment\\u2014restores your resilience, clarity, and peace.",
      "coreThesis": "Suffering is not caused by difficult emotions, but by our relentless war against them. True emotional freedom begins the moment you stop treating yourself as a defect to be fixed and start observing your life with clear eyes and unconditional goodwill.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Radical Acceptance"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "radical-compassion",
    "title": "Radical Compassion",
    "author": "Tara Brach",
    "category": "Psychology",
    "subcategory": "Emotional Intelligence",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/9261086-M.jpg",
    "readingTimeMinutes": 55,
    "publishedYear": 2020,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "When emotional storms hit, our default response is to crash the engine or slam on the brakes in panic. Radical Compassion provides an engineer's systematic diagnostic tool\\u2014the RAIN protocol\\u2014to defuse internal alarms, soothe the biological stress response, and restore lucid control within minutes.",
      "coreThesis": "Suffering is an automated feedback loop sustained by resisting raw emotion; systematically acknowledging, exploring, and soothing somatic tension immediately restores prefrontal clarity and disarms internal shame.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Radical Compassion"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "range-why-generalists-triumph-in-a-specialized-world",
    "title": "Range: Why Generalists Triumph in a Specialized World",
    "author": "David Epstein",
    "category": "Personal Growth",
    "subcategory": "Life Transitions & Reinvention",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8782615-M.jpg",
    "readingTimeMinutes": 60,
    "publishedYear": 2019,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "We are constantly told that early hyper-specialization is the only road to mastery, but modern reality proves the opposite. In a messy, unpredictable world, the biggest breakthroughs belong to curious generalists who wander widely, cross-pollinate ideas, and connect hidden dots.",
      "coreThesis": "In complex, evolving systems, broad exploratory sampling beats early specialization, because conceptual flexibility and cross-domain pattern matching generate far greater long-term impact than narrow mechanical speed.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Range: Why Generalists Triumph in a Specialized World"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "rational-recovery",
    "title": "Rational Recovery",
    "author": "Jack Trimpey",
    "category": "Productivity",
    "subcategory": "Beating Procrastination",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/406043-M.jpg",
    "readingTimeMinutes": 105,
    "publishedYear": 1996,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Addiction is not a chronic biological defect; it is a communication glitch between your rational prefrontal steering wheel and your primal survival engine. Learn to decode that internal signal, draw a clear line in the sand, and step off the recovery carousel for good.",
      "coreThesis": "You are the conscious driver with exclusive physical control over your body; any internal thought or desire suggesting future substance use is merely mechanical noise from an overactive survival instinct that you can effortlessly recognize and disregard.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Rational Recovery"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "reading-the-buddha-s-discourses-in-pali",
    "title": "Reading the Buddha's Discourses in Pali",
    "author": "Bhikkhu Bodhi",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2020,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Step past third-hand interpretations and listen directly to the Buddha's ancient voice. By pairing original core teachings with rigorous, transparent word-by-word breakdowns, this work turns the language of liberation into an immediate, living mirror for your own mind.",
      "coreThesis": "Direct engagement with the original words of the Dhamma demystifies awakening, revealing liberation not as a mystical belief, but as an empirical, condition-by-condition training of immediate awareness.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Reading the Buddha's Discourses in Pali"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "rebirth-in-early-buddhism-and-current-research",
    "title": "Rebirth in Early Buddhism and Current Research",
    "author": "Bhikkhu Analayo",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2018,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "What if consciousness does not end at biological shutdown, but streams forward like a river navigating changing terrain? This book unites ancient contemplative blueprints with rigorous empirical research to investigate consciousness continuity without dogmatic superstition.",
      "coreThesis": "Rebirth is not the migration of an unchanging soul, but an interdependent, dynamic stream of consciousness sustained by behavioral momentum and verified by cross-disciplinary evidence.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Rebirth in Early Buddhism and Current Research"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "reclaiming-conversation-the-power-of-talk-in-a-digital-age",
    "title": "Reclaiming Conversation: The Power of Talk in a Digital Age",
    "author": "Sherry Turkle",
    "category": "Communication",
    "subcategory": "Remote & Digital Communication",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/7392421-M.jpg",
    "readingTimeMinutes": 60,
    "publishedYear": 2015,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "We traded high-friction, high-yield dialogue for sanitized digital messaging\\u2014and destroyed our baseline capacity for empathy, focus, and leadership in the process. Reclaiming spontaneous face-to-face talk is not nostalgic sentiment; it is the ultimate competitive advantage for clear thinking and resilient collaboration.",
      "coreThesis": "Frictionless digital messaging offers the illusion of continuous connection while systematically degrading empathy, critical reflection, and deep collaboration. High-bandwidth, face-to-face dialogue remains the only reliable protocol for building genuine trust, resilience, and operational clarity.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Reclaiming Conversation: The Power of Talk in a Digital Age"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "reinventing-you",
    "title": "Reinventing You",
    "author": "Dorie Clark",
    "category": "Personal Growth",
    "subcategory": "Life Transitions & Reinvention",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/7807096-M.jpg",
    "readingTimeMinutes": 55,
    "publishedYear": 2013,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your professional reputation is an operating system running whether you configure it or not. By applying deliberate feedback loops, low-risk field tests, and clear narrative architecture, you can methodically rewire how the world perceives your capabilities and value.",
      "coreThesis": "Professional reputation is not an immutable identity set in stone, but an ongoing feedback loop that you can systematically measure, prototype, and re-engineer through visible proof and clear narrative framing.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Reinventing You"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "reinventing-your-life",
    "title": "Reinventing Your Life",
    "author": "Jeffrey E. Young & Janet S. Klosko",
    "category": "Psychology",
    "subcategory": "Human Behavior",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/296518-M.jpg",
    "readingTimeMinutes": 85,
    "publishedYear": 1993,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Why do we repeatedly stumble into the exact same painful relationship patterns and self-sabotaging habits? Schema therapy reveals the hidden behavioral blueprints running in your background\\u2014and hands you the diagnostic toolkit to reprogram them for good.",
      "coreThesis": "Self-defeating life patterns are not permanent personality flaws, but outdated childhood survival programs that can be systematically identified, challenged, and rewired.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Reinventing Your Life"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "relax-and-be-aware-mindfulness-in-daily-life",
    "title": "Relax and Be Aware: Mindfulness in Daily Life",
    "author": "Sayadaw U Tejaniya",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 155,
    "publishedYear": 2019,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop wrestling with your mind on the meditation cushion and discover that true freedom lives right inside your daily routine. Sayadaw U Tejaniya reveals how effortless, continuous awareness during everyday moments dissolves suffering faster than forceful concentration ever could.",
      "coreThesis": "Enlightenment is not manufactured through forceful concentration, but uncovered through continuous, relaxed awareness that observes both life and the observing mind with zero aversion or craving.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Relax and Be Aware: Mindfulness in Daily Life"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "remote-office-not-required",
    "title": "Remote: Office Not Required",
    "author": "Jason Fried & David Heinemeier Hansson",
    "category": "Communication",
    "subcategory": "Remote & Digital Communication",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8142534-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2013,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Offices function like highway traffic jams: dense, noisy, and constantly interrupting the forward momentum of actual work. By replacing physical presence with asynchronous clarity, organizations unlock global talent and deep, sustained cognitive flow.",
      "coreThesis": "Meaningful cognitive work demands sustained uninterrupted focus, which modern physical offices inherently destroy; judging professionals by tangible output rather than seat time unlocks superior autonomy, broader talent, and saner lives.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Remote: Office Not Required"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "rest-why-you-get-more-done-when-you-work-less",
    "title": "Rest: Why You Get More Done When You Work Less",
    "author": "Alex Soojung-Kim Pang",
    "category": "Productivity",
    "subcategory": "Energy & Burnout",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10453387-M.jpg",
    "readingTimeMinutes": 50,
    "publishedYear": 2016,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Rest is not the absence of work; it is an active biological engine that drives creative breakthroughs and sustainable focus. Master deliberate recovery to double your creative output while slashing your working hours in half.",
      "coreThesis": "Work and rest are inseparable halves of the same biological feedback loop; elite focus and breakthrough creativity are fueled by deliberate, active recovery rather than endless marathon hours.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Rest: Why You Get More Done When You Work Less"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "rethinking-narcissism-anger",
    "title": "Rethinking Narcissism & Anger",
    "author": "Craig Malkin",
    "category": "Psychology",
    "subcategory": "Mental Health & Healing",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 60,
    "publishedYear": 2015,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Narcissism is not an all-or-nothing character flaw\\u2014it is a finely tuned psychological thermostat governing self-worth. Dialed too low, you erase your needs; dialed too high, you scorch everyone around you.",
      "coreThesis": "Narcissism is a spectrum of the universal human drive to feel special: operating in the middle range fuels resilience, secure boundaries, and vital passion, while extremes at either end trigger systemic relational breakdown.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Rethinking Narcissism & Anger"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "right-mindfulness-memory-and-ardency-on-the-buddhist-path",
    "title": "Right Mindfulness: Memory and Ardency on the Buddhist Path",
    "author": "Thanissaro Bhikkhu",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2012,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Mindfulness is not passive, open-ended daydreaming\\u2014it is an active, trained vigilance that protects your attention and steers your mind toward unshakeable clarity.",
      "coreThesis": "Right mindfulness is active, memory-anchored vigilance that uses purposeful effort to abandon destructive habits and establish deep mental stillness.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Right Mindfulness: Memory and Ardency on the Buddhist Path"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "risk-savvy-how-to-make-good-decisions",
    "title": "Risk Savvy: How to Make Good Decisions",
    "author": "Gerd Gigerenzer",
    "category": "Psychology",
    "subcategory": "Decision Making",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 60,
    "publishedYear": 2014,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "When navigating deep uncertainty, complex algorithms fail while robust rules of thumb dominate. Master strategist Gerd Gigerenzer demonstrates how simple heuristics cut through administrative paralysis to deliver decisive results.",
      "coreThesis": "In an uncertain world, complex calculations produce systemic fragility, whereas transparent, experience-tested heuristics yield superior, robust decisions.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Risk Savvy: How to Make Good Decisions"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "satipatthana-meditation-a-practice-guide",
    "title": "Satipatthana Meditation: A Practice Guide",
    "author": "Bhikkhu Analayo",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/670599-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2018,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Bhikkhu An\\u0101layo strips ancient contemplative practice down to its core engineering principles, transforming the foundational Buddhist meditation manual into a modular, testable operating manual for human consciousness. By treating the mind like a self-regulating dynamical system rather than an mystical enigma, this guide shows exactly how to decondition cognitive bias, dissolve psychological clinging, and access radical perceptual freedom.",
      "coreThesis": "Psychological suffering is an automated system error caused by mistaking transient physical and mental processes for a permanent personal identity; systematically observing these processes through embodied, non-reactive awareness dismantles the feedback loops of clinging and uncovers effortless mental liberation.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Satipatthana Meditation: A Practice Guide"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "satipatthana-the-direct-path-to-realization",
    "title": "Satipatthana: The Direct Path to Realization",
    "author": "Bhikkhu Analayo",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/670599-M.jpg",
    "readingTimeMinutes": 75,
    "publishedYear": 2003,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Mindfulness is not a vague relaxation trick\\u2014it is a high-precision diagnostic instrument for auditing human consciousness. Bhikkhu Analayo reverse-engineers the earliest manual on awareness, offering an empirical laboratory blueprint to observe cognitive feedback loops and unhook habitual suffering in real time.",
      "coreThesis": "Suffering is maintained by automatic cognitive feedback loops, and systematically observing the bare mechanics of experience\\u2014body, feeling tones, mental states, and natural patterns\\u2014dismantles the reactive machinery of the mind.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Satipatthana: The Direct Path to Realization"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "satipatthana-vipassana-meditation-basic-and-progressive-practice",
    "title": "Satipatthana Vipassana Meditation: Basic and Progressive Practice",
    "author": "Mahasi Sayadaw",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 60,
    "publishedYear": 1971,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Think of your conscious mind as a high-speed operating system running countless automated subroutines behind your back. Mahasi Sayadaw hands you the diagnostic logging manual to track every cognitive signal in real time, dissolve stubborn mental friction, and reboot baseline awareness into effortless clarity.",
      "coreThesis": "Suffering is an operational glitch caused by mistaking fluid, impermanent sensory signals for an enduring, solid identity; real-time mental tagging dissolves this feedback loop into direct, liberating insight.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Satipatthana Vipassana Meditation: Basic and Progressive Practice"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "say-good-night-to-insomnia",
    "title": "Say Good Night to Insomnia",
    "author": "Gregg D. Jacobs",
    "category": "Health & Longevity",
    "subcategory": "Sleep & Circadian Rhythms",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/580062-M.jpg",
    "readingTimeMinutes": 50,
    "publishedYear": 1998,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Chronic insomnia is not a broken biological motor; it is a miscalibrated thermostat fueled by performance anxiety and conditioned bedroom frustration. By dismantling catastrophizing self-talk and retraining sleep habits through clinically proven CBT-I, you can permanently restore your natural ability to sleep soundly without pills.",
      "coreThesis": "Insomnia is a learned pattern of mental hyperarousal and conditioned bedroom anxiety, which can be permanently cured by rewiring faulty sleep beliefs and consolidating time in bed.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Say Good Night to Insomnia"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Finance",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "say-what-you-mean-a-mindful-approach-to-nonviolent-communica",
    "title": "Say What You Mean: A Mindful Approach to Nonviolent Communication",
    "author": "Oren Jay Sofer",
    "category": "Communication",
    "subcategory": "Difficult Conversations",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/9216587-M.jpg",
    "readingTimeMinutes": 65,
    "publishedYear": 2018,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Most conversations fail not because our logic is flawed, but because our nervous systems hijack our words before we even finish listening. By fusing contemplative mindfulness, somatic nervous-system regulation, and Nonviolent Communication, this book reveals the hidden biological and psychological feedback loops that turn friction into collaborative flow.",
      "coreThesis": "Constructive communication is an embodied, systemic discipline where conversational outcomes depend on grounding nervous-system presence, holding an unwavering intention to connect, and focusing attention on universal human needs rather than positional strategies.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Say What You Mean: A Mindful Approach to Nonviolent Communication"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "saying-no-to-say-yes",
    "title": "Saying No to Say Yes",
    "author": "Various clinical manuals on assertiveness and people-pleasing cessation.",
    "category": "Communication",
    "subcategory": "Boundaries & Assertiveness",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 50,
    "publishedYear": 2018,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Every automatic 'yes' you give out of social anxiety is a silent, binding 'no' stolen from your real priorities and well-being. Master the clinical mechanics of boundary defense to reclaim your autonomy without alienating the people who matter.",
      "coreThesis": "Saying 'no' is not relationship sabotage; it is the fundamental conservation law that protects your finite cognitive and emotional capacity so your 'yes' retains genuine value.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Saying No to Say Yes"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "scale",
    "title": "Scale",
    "author": "Geoffrey West",
    "category": "Psychology",
    "subcategory": "Human Behavior",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8118023-M.jpg",
    "readingTimeMinutes": 50,
    "publishedYear": 2017,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Beneath the apparent chaos of living beasts, bustling metropolises, and multinational corporations lies a startling mathematical harmony. Discover how hidden network physics dictates the heartbeat of a mouse, the vitality of Tokyo, and the inevitable mortality of Wall Street giants.",
      "coreThesis": "Universal mathematical scaling laws govern biological life, urban expansion, and corporate mortality through the shared geometry of internal distribution networks. While biology and corporations plateau under sublinear limits, cities thrive on superlinear social acceleration that requires ever-faster innovation cycles to survive.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Scale"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "search-inside-yourself",
    "title": "Search Inside Yourself",
    "author": "Chade-Meng Tan",
    "category": "Psychology",
    "subcategory": "Emotional Intelligence",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/7983717-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2012,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Emotional intelligence is not a mystical personality trait; it is a trainable set of neural circuits. By strengthening attention like a physical muscle, anyone can rewire their mind for calm focus, peak resilience, and effortless empathy.",
      "coreThesis": "Emotional intelligence is a hard cognitive skill built on attention training, enabling you to master inner states, read social dynamics with precision, and navigate high-pressure situations with calm clarity.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Search Inside Yourself"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "seeing-systems-unlocking-the-mysteries-of-organizational-lif",
    "title": "Seeing Systems: Unlocking the Mysteries of Organizational Life",
    "author": "Barry Oshry",
    "category": "Psychology",
    "subcategory": "Human Behavior",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/3813215-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 1995,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Step behind the curtain of organizational life to discover the invisible systemic currents governing workplace friction. Human conflict is rarely a clash of flawed personalities; it is the predictable choreography of systemic positions.",
      "coreThesis": "Organizational friction stems from structural conditions rather than flawed character. True effectiveness requires diagnosing systemic dynamics and choosing conscious partnership over unconscious reflex.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Seeing Systems: Unlocking the Mysteries of Organizational Life"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "seeking-buddho-teachings-on-meditation",
    "title": "Seeking Buddho: Teachings on Meditation",
    "author": "Ajahn Anan",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2006,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your mind already possesses an unshakeable inner refuge, yet daily distraction keeps you looking outside for peace. 'Seeking Buddho' offers an authentic, grounded field guide from the Thai Forest Tradition to train undivided attention, master mental stillness, and wake up to your true nature.",
      "coreThesis": "Genuine liberation is realized when concentrated stillness stabilizes the mind, enabling clear insight into impermanence and awakening the unshakeable awareness already present within.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Seeking Buddho: Teachings on Meditation"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "self-compassion-the-proven-power-of-being-kind-to-yourself",
    "title": "Self-Compassion: The Proven Power of Being Kind to Yourself",
    "author": "Kristin Neff",
    "category": "Psychology",
    "subcategory": "Emotional Intelligence",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/14685182-M.jpg",
    "readingTimeMinutes": 65,
    "publishedYear": 2011,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Self-criticism is bad risk management that paralyzes decision-making under stress. Dr. Kristin Neff outlines a battle-tested protocol to treat yourself as a high-value ally, turning setbacks into rapid data loops instead of costly emotional spirals.",
      "coreThesis": "Beating yourself up destroys cognitive bandwidth and execution speed; treating yourself as a valuable asset under pressure is the ultimate competitive moat.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Self-Compassion: The Proven Power of Being Kind to Yourself"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "selves-and-not-self-buddhist-epistemology",
    "title": "Selves and Not-Self: Buddhist Epistemology",
    "author": "Thanissaro Bhikkhu",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2011,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop asking who you are and start noticing what your mind is doing. The Buddha never taught that you have no self; he gave you 'self' and 'not-self' as precision tools to dismantle suffering and uncover boundless peace.",
      "coreThesis": "Self and not-self are not doctrines about your metaphysical identity; they are practical perceptual strategies designed to systematically dismantle suffering until unconditioned freedom is realized.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Selves and Not-Self: Buddhist Epistemology"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "set-boundaries-find-peace-a-guide-to-reclaiming-yourself",
    "title": "Set Boundaries, Find Peace: A Guide to Reclaiming Yourself",
    "author": "Nedra Glover Tawwab",
    "category": "Communication",
    "subcategory": "Boundaries & Assertiveness",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10543310-M.jpg",
    "readingTimeMinutes": 75,
    "publishedYear": 2021,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Healthy relationships do not run on mind reading; they run on clean, well-marked road signs. Nedra Glover Tawwab reveals how clear boundary scripting is not an act of hostility, but the foundational engineering protocol that preserves your peace and deepens mutual trust.",
      "coreThesis": "Boundaries are not selfish walls that isolate you from others; they are the explicit rules of engagement that make safe, lasting human connection possible.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Set Boundaries, Find Peace: A Guide to Reclaiming Yourself"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "7-powers-the-foundations-of-business-strategy",
    "title": "7 Powers: The Foundations of Business Strategy",
    "author": "Hamilton Helmer",
    "category": "Business & Strategy",
    "subcategory": "Strategy & Competitive Moats",
    "coverColor": "from-blue-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10208801-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2016,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Operational excellence keeps you alive today, but only structural Power prevents rivals from crushing you tomorrow. If you lack a durable moat, fierce competition will inevitably grind your profit margins down to zero.",
      "coreThesis": "Durable business value requires Power: a set of structural conditions creating a persistent benefit combined with an unassailable barrier against competitors.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "7 Powers: The Foundations of Business Strategy"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Strategy",
      "Core Insights"
    ]
  },
  {
    "id": "she-understanding-feminine-psychology",
    "title": "She: Understanding Feminine Psychology",
    "author": "Robert A. Johnson",
    "category": "Psychology",
    "subcategory": "Personality & Shadow Work",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/5531205-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 1976,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Human maturity begins when romantic illusions shatter. By reverse-engineering the ancient myth of Psyche and Eros, Robert Johnson reveals the precise psychological blueprint every adult must follow to replace naive dependence with resilient selfhood.",
      "coreThesis": "Psychological wholeness is earned only when you shatter romantic projections, accept the pain of conscious awareness, and complete practical tasks that integrate intuitive wisdom with disciplined discernment.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "She: Understanding Feminine Psychology"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "show-your-work",
    "title": "Show Your Work!",
    "author": "Austin Kleon",
    "category": "Creativity & Expression",
    "subcategory": "Overcoming Creative Resistance",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/7284188-M.jpg",
    "readingTimeMinutes": 50,
    "publishedYear": 2014,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop hiding in a solitary laboratory waiting for a bolt of inspiration; treat your daily work like an open workshop where documenting the process turns quiet effort into an organic magnet for collaborators and opportunities.",
      "coreThesis": "Creativity is a communal network effect rather than a solitary flash of genius; by consistently sharing your unfinished experiments and daily process, you build a generative magnet for community, feedback, and career longevity.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Show Your Work!"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "silent-rain-collected-dhamma-talks",
    "title": "Silent Rain: Collected Dhamma Talks",
    "author": "Ajahn Amaro",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 60,
    "publishedYear": 1996,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your mind is like an open sky that has mistaken passing weather for its own identity. Ajahn Amaro shows how walking through life without mental baggage reveals the quiet peace already resting beneath all your noise.",
      "coreThesis": "Suffering occurs when we grasp at changing experiences; genuine peace is discovered by resting as the silent, unattached awareness that holds all things.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Silent Rain: Collected Dhamma Talks"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "simple-teachings-on-higher-truths",
    "title": "Simple Teachings on Higher Truths",
    "author": "Ajahn Anan",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 305,
    "publishedYear": 2009,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Ajahn Anan dismantles spiritual complexity with the warmth of a master gardener, showing that liberation from suffering is not an exotic mountain retreat but a clean, grounded way of seeing reality right in the middle of domestic and work life. It is an indispensable manual for calming a turbulent mind, untangling everyday friction, and resting in an unshakeable inner home.",
      "coreThesis": "Suffering is not caused by life's changing circumstances, but by our clinging to them; by cultivating moral integrity, present-moment attention, and clear seeing, we discover an unshakeable inner peace that is already here.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Simple Teachings on Higher Truths"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "skill-in-questions-how-the-buddha-taught",
    "title": "Skill in Questions: How the Buddha Taught",
    "author": "Thanissaro Bhikkhu",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2010,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Master the art of spiritual inquiry: discover how asking the right questions\\u2014and deliberately ignoring the wrong ones\\u2014becomes the master key to personal peace and liberation.",
      "coreThesis": "Awakening is not about possessing universal theoretical knowledge, but about mastering the fourfold craft of questioning so that every thought actively dissolves suffering.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Skill in Questions: How the Buddha Taught"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "skin-in-the-game",
    "title": "Skin in the Game",
    "author": "Nassim Nicholas Taleb",
    "category": "Psychology",
    "subcategory": "Decision Making",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10856868-M.jpg",
    "readingTimeMinutes": 95,
    "publishedYear": 2018,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Never trust an architect who does not sleep inside the building he designs. Real authority demands personal downside risk.",
      "coreThesis": "You cannot possess genuine knowledge or moral authority without absorbing direct personal downside from your own decisions.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Skin in the Game"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "sleep-smarter",
    "title": "Sleep Smarter",
    "author": "Shawn Stevenson",
    "category": "Health & Longevity",
    "subcategory": "Sleep & Circadian Rhythms",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10639862-M.jpg",
    "readingTimeMinutes": 105,
    "publishedYear": 2014,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Think of sleep not as lost time, but as the master mechanic that rebuilds your body, sharpens your mind, and burns fat while you rest. Master the environmental levers around light, temperature, and biology, and you unlock your highest daily performance.",
      "coreThesis": "Sleep is the fundamental operating system for human health, cognition, and body composition; when you engineer your environment and daily rhythms to align with your circadian biology, effortless energy and recovery follow automatically.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Sleep Smarter"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Finance",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "slight-edge",
    "title": "Slight Edge",
    "author": "Jeff Olson",
    "category": "Productivity",
    "subcategory": "Habits & Routines",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/7285715-M.jpg",
    "readingTimeMinutes": 90,
    "publishedYear": 2005,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Massive success and quiet failure are produced by the exact same mechanism: tiny, seemingly insignificant daily choices compounded over time. Master the mundane actions that are easy to do and easy not to do, and time becomes your ultimate competitive advantage.",
      "coreThesis": "Simple daily disciplines repeated consistently over time compound into extraordinary achievement, while simple daily neglects repeated consistently compound into silent failure.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Slight Edge"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "small-boat-great-mountain-reflections-on-dzogchen-and-theravada",
    "title": "Small Boat, Great Mountain: Reflections on Dzogchen and Theravada",
    "author": "Ajahn Amaro",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2003,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "What happens when the pristine, step-by-step discipline of Therav\\u0101da meditation meets the direct, panoramic freedom of Tibetan Dzogchen? Ajahn Amaro reveals that both ancient rivers flow into the exact same ocean of primordial, unattached awareness.",
      "coreThesis": "Enlightenment is neither a far-off achievement nor the exclusive property of any single tradition; it is the immediate, unconditioned awareness that naturally reveals itself the moment you stop clinging to passing mental states.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Small Boat, Great Mountain: Reflections on Dzogchen and Theravada"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "smart-brevity-the-power-of-saying-more-with-less",
    "title": "Smart Brevity: The Power of Saying More with Less",
    "author": "Jim VandeHei, Mike Allen, Roy Schwartz",
    "category": "Communication",
    "subcategory": "Remote & Digital Communication",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/12499578-M.jpg",
    "readingTimeMinutes": 130,
    "publishedYear": 2022,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Most professional communication is a chaotic traffic jam of bloat, jargon, and buried points that readers ignore. Smart Brevity gives you the blueprint to strip the fat, command attention, and turn every email, memo, and meeting into an unmistakable competitive advantage.",
      "coreThesis": "Brevity is not about cutting out substance; it is about doing the hard editorial work for your reader so only what is essential, urgent, and actionable survives.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Smart Brevity: The Power of Saying More with Less"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "smart-choices",
    "title": "Smart Choices",
    "author": "John S. Hammond, Ralph L. Keeney, Howard Raiffa",
    "category": "Psychology",
    "subcategory": "Decision Making",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/668157-M.jpg",
    "readingTimeMinutes": 55,
    "publishedYear": 1999,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Decisions are the steering wheel of your life, yet most people drive blindfolded by hidden cognitive biases and knee-jerk impulses. This masterwork unpacks the hidden mechanics of choice, turning messy judgment calls into an elegant, repeatable science.",
      "coreThesis": "You cannot control the dice of luck, but you can master the architecture of your choices. High-quality structured processes consistently produce superior life outcomes.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Smart Choices"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "snakes-in-suits-when-psychopaths-go-to-work",
    "title": "Snakes in Suits: When Psychopaths Go to Work",
    "author": "Paul Babiak & Robert D. Hare",
    "category": "Psychology",
    "subcategory": "Personality & Shadow Work",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/37642-M.jpg",
    "readingTimeMinutes": 55,
    "publishedYear": 2006,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Charismatic predators don't just lurk in crime documentaries; they interview brilliantly, wear tailored suits, and climb corporate ladders by exploiting systemic blind spots. Babiak and Hare illuminate the hidden operating system of the workplace psychopath and deliver the diagnostic toolkit to disarm them.",
      "coreThesis": "Corporate psychopaths use glib charm and emotional detachment to exploit organizational chaos, climbing executive ranks by dividing teams and weaponizing workplace trust against good-faith performers.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Snakes in Suits: When Psychopaths Go to Work"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "so-good-they-can-t-ignore-you",
    "title": "So Good They Can't Ignore You",
    "author": "Cal Newport",
    "category": "Personal Growth",
    "subcategory": "Life Transitions & Reinvention",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/9215292-M.jpg",
    "readingTimeMinutes": 80,
    "publishedYear": 2012,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop searching for a pre-packaged passion and start building rare, undeniable craftsmanship that commands respect. True career fulfillment is not found\\u2014it is systematically constructed through accumulated leverage, deliberate practice, and earned autonomy.",
      "coreThesis": "Fulfilling work is not discovered by following pre-existing passion, but engineered by acquiring rare and valuable skills that buy autonomy, mastery, and purpose.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "So Good They Can't Ignore You"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "socratic-logic",
    "title": "Socratic Logic",
    "author": "Peter Kreeft",
    "category": "Creativity & Expression",
    "subcategory": "Logic, Rhetoric & Argument",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/938515-M.jpg",
    "readingTimeMinutes": 80,
    "publishedYear": 2004,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Human thought functions like a precision engine operating on three interconnected gears: understanding, judging, and reasoning. Peter Kreeft restores classical Socratic dialogue and Aristotelian deduction into a living diagnostic tool for navigating complex real-world claims.",
      "coreThesis": "Sound human thinking relies on three interdependent acts of the mind\\u2014clear understanding of terms, true judgments in propositions, and valid reasoning in syllogisms\\u2014which together form the ultimate quality-control mechanism for truth.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Socratic Logic"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "solving-the-procrastination-puzzle",
    "title": "Solving the Procrastination Puzzle",
    "author": "Timothy A. Pychyl",
    "category": "Productivity",
    "subcategory": "Beating Procrastination",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/7577549-M.jpg",
    "readingTimeMinutes": 50,
    "publishedYear": 2013,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Procrastination isn't poor time management\\u2014it is an emotional coping mechanism gone wrong. Master the science of short-term mood regulation, lower your activation barrier, and build unstoppable daily momentum.",
      "coreThesis": "Procrastination is an emotional regulation problem, not a time management flaw; momentum begins only when you lower the activation threshold and just get started.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Solving the Procrastination Puzzle"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "somatics-reawakening-the-mind-s-control-of-movement",
    "title": "Somatics: Reawakening the Mind's Control of Movement",
    "author": "Thomas Hanna",
    "category": "Health & Longevity",
    "subcategory": "Breathwork & Somatics",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/465529-M.jpg",
    "readingTimeMinutes": 65,
    "publishedYear": 1988,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Chronic stiffness and age-related aches are not wear-and-tear on your joints; they are software glitches in your nervous system. By replacing forceful stretching with conscious cortical recalibration, you can teach tight muscles how to let go on command.",
      "coreThesis": "The stiffness and pain commonly blamed on aging are actually Sensory-Motor Amnesia\\u2014a learned neurological amnesia that can be completely reversed by deliberately re-educating the brain's motor control over chronically locked muscles.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Somatics: Reawakening the Mind's Control of Movement"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Finance",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "sources-of-power",
    "title": "Sources of Power",
    "author": "Gary Klein",
    "category": "Psychology",
    "subcategory": "Decision Making",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/151890-M.jpg",
    "readingTimeMinutes": 85,
    "publishedYear": 1998,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Traditional decision theory demands spreadsheets and decision trees, but real combat and crisis commanders execute winning moves in seconds. Gary Klein reveals the tactical engine of true expertise: pattern recognition, mental simulation, and decisive execution under high-stakes uncertainty.",
      "coreThesis": "Master practitioners do not waste time comparing multiple options under pressure. They recognize recognizable patterns instantly and use mental simulation to validate a single viable action.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Sources of Power"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "speak-peace-in-a-world-of-conflict",
    "title": "Speak Peace in a World of Conflict",
    "author": "Marshall B. Rosenberg",
    "category": "Communication",
    "subcategory": "Active Listening & Empathy",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/940701-M.jpg",
    "readingTimeMinutes": 60,
    "publishedYear": 2005,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Every conflict is simply the tragic, distorted expression of an unmet human need. When you decode the underlying biological and psychological drivers behind hostility, peace transforms from a vague moral ideal into an exact engineering protocol.",
      "coreThesis": "Hostility and violence are tragic expressions of unmet universal needs; translating static judgments into actionable observations and needs reliably dissolves conflict.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Speak Peace in a World of Conflict"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "start-with-no-the-negotiating-tools-that-the-pros-don-t-want",
    "title": "Start with NO: The Negotiating Tools that the Pros Don't Want You to Know",
    "author": "Jim Camp",
    "category": "Sales & Persuasion",
    "subcategory": "Persuasion & Influence",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/390585-M.jpg",
    "readingTimeMinutes": 70,
    "publishedYear": 2002,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop chasing the seductive trap of 'win-win' compromises and start by inviting the word 'no'. By eliminating emotional neediness and controlling your own behavioral process, you unlock true leverage and discover what the other side actually needs.",
      "coreThesis": "A durable agreement is born only when people feel safe enough to say 'no'; real negotiating power lies in eliminating personal neediness and strictly managing your own behavioral process.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Start with NO: The Negotiating Tools that the Pros Don't Want You to Know"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "start-with-why-how-great-leaders-inspire-everyone-to-take-ac",
    "title": "Start with Why: How Great Leaders Inspire Everyone to Take Action",
    "author": "Simon Sinek",
    "category": "Personal Growth",
    "subcategory": "Purpose & Meaning",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/6395237-M.jpg",
    "readingTimeMinutes": 70,
    "publishedYear": 2009,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Most strive to survive through pressure, price cuts, and endless noise. True resonance begins inward, anchoring every action to an unshakeable purpose that draws others like a calm flame.",
      "coreThesis": "People do not buy what you do; they buy why you do it. Lasting influence is not forced from the outside, but radiates naturally from centered conviction.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Start with Why: How Great Leaders Inspire Everyone to Take Action"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "starting-strength-basic-barbell-training",
    "title": "Starting Strength: Basic Barbell Training",
    "author": "Mark Rippetoe",
    "category": "Health & Longevity",
    "subcategory": "Fitness & Strength",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8722490-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2011,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Strength is not a specialized talent; it is the fundamental mechanical baseline that elevates every other physical capability in life. By mastering five basic barbell movements and incrementally adding tiny amounts of weight each workout, you trigger an undeniable biological adaptation engine.",
      "coreThesis": "Strength is the foundational physical attribute of human biology; applying incremental, measurable stress through multi-joint barbell movements systematically forces the entire neuromuscular system to adapt and grow stronger.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Starting Strength: Basic Barbell Training"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Finance",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "stick-with-it",
    "title": "Stick with It",
    "author": "Sean Young",
    "category": "Productivity",
    "subcategory": "Goal Setting & Execution",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8880879-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2017,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop blaming your personality or praying for more willpower. Lasting change is not an internal character virtue\\u2014it is a mechanical systems problem solved by structural behavioral engineering.",
      "coreThesis": "You do not need to change who you are to change what you do; lasting transformation happens when you engineer the external ecosystem and psychological levers surrounding your actions.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Stick with It"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "stillness-flowing-the-life-and-teachings-of-ajahn-chah",
    "title": "Stillness Flowing: The Life and Teachings of Ajahn Chah",
    "author": "Ajahn Jayasaro",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 55,
    "publishedYear": 2017,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Step into the definitive, serene biography of Ajahn Chah, the forest monk whose direct wisdom transformed modern global mindfulness. It proves that lasting inner peace is not found by stopping the chaotic currents of life, but by resting as the clear riverbed through which everything freely flows.",
      "coreThesis": "Suffering occurs only when we demand that changing things stay still; true peace is not a quiet environment, but the unshakable awareness that watches life arise and pass without clinging.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Stillness Flowing: The Life and Teachings of Ajahn Chah"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "stolen-focus-why-you-can-t-pay-attention",
    "title": "Stolen Focus: Why You Can't Pay Attention",
    "author": "Johann Hari",
    "category": "Productivity",
    "subcategory": "Focus & Deep Work",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/12664855-M.jpg",
    "readingTimeMinutes": 70,
    "publishedYear": 2022,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your inability to focus is not a personal character flaw; it is the calculated byproduct of an extractive modern ecosystem designed to capture and fracture your mind. Reclaiming attention requires treating mental bandwidth not like a private willpower battle, but like clean water\\u2014a shared ecological resource that must be fiercely protected.",
      "coreThesis": "Our collapsing focus is not an individual moral failure but a systemic environmental poisoning caused by extractive business models, chronic overwork, and sensory overload. Restoring deep focus requires both personal boundaries and collective political resistance against the architectures designed to fragment us.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Stolen Focus: Why You Can't Pay Attention"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "stop-walking-on-eggshells",
    "title": "Stop Walking on Eggshells",
    "author": "Paul T. Mason & Randi Kreger",
    "category": "Communication",
    "subcategory": "Boundaries & Assertiveness",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/6803634-M.jpg",
    "readingTimeMinutes": 60,
    "publishedYear": 1998,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "When someone close to you experiences emotional third-degree burns, your instinct is to tiptoe\\u2014yet accommodating the blast radius only feeds the fire. This groundbreaking manual unpacks the hidden mechanics of borderline relational dynamics, handing you the blueprint to reclaim your autonomy, reset structural boundaries, and stop walking on eggshells.",
      "coreThesis": "You cannot control, cure, or cause another person's emotional dysregulation; real peace begins the moment you replace accommodation with unyielding personal boundaries.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Stop Walking on Eggshells"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "straight-from-the-heart-dhamma-talks",
    "title": "Straight from the Heart: Dhamma Talks",
    "author": "Ajahn Maha Bua",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 65,
    "publishedYear": 1987,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Strip away scholastic debates and encounter the raw, fierce reality of meditation practice straight from a Thai Forest master. This collection offers a practical manual for dissecting physical pain, dissolving inner illusions, and unveiling genuine, unconditioned freedom.",
      "coreThesis": "Suffering is maintained by blind identification with physical sensations and mental chatter; relentless discernment in the present moment completely dismantles this illusion, revealing the mind's native, indestructible freedom.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Straight from the Heart: Dhamma Talks"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "strangers-to-ourselves-discovering-the-adaptive-unconscious",
    "title": "Strangers to Ourselves: Discovering the Adaptive Unconscious",
    "author": "Timothy D. Wilson",
    "category": "Psychology",
    "subcategory": "Human Behavior",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/412250-M.jpg",
    "readingTimeMinutes": 50,
    "publishedYear": 2002,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "You are not the sole author of your mind, but the spokesperson explaining decisions already made beneath the surface. Discover the powerful, adaptive unconscious that runs your daily life and learn how to truly understand yourself from the outside in.",
      "coreThesis": "The conscious mind is an interpretive storyteller rather than an omniscient controller; genuine self-insight comes not from inward gaze, but from observing and reshaping our outward actions.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Strangers to Ourselves: Discovering the Adaptive Unconscious"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "super-thinking-the-big-book-of-mental-models",
    "title": "Super Thinking: The Big Book of Mental Models",
    "author": "Gabriel Weinberg & Lauren McCann",
    "category": "Productivity",
    "subcategory": "Speed Reading & Learning",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10153705-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2019,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Most bad choices happen not because people lack intelligence, but because they reach for the wrong cognitive tool. *Super Thinking* equips you with a master toolkit of cross-disciplinary mental models so you can navigate complex life, career, and business decisions with quiet, surgical clarity.",
      "coreThesis": "You cannot solve multifaceted, non-linear challenges using a single mental lens; true judgment comes from assembling a versatile latticework of recurring models across disciplines to systematically reduce errors and spot hidden leverage.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Super Thinking: The Big Book of Mental Models"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "supercommunicators-how-to-unlock-the-secret-language-of-conn",
    "title": "Supercommunicators: How to Unlock the Secret Language of Connection",
    "author": "Charles Duhigg",
    "category": "Communication",
    "subcategory": "Remote & Digital Communication",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/14591638-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2024,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Every conversation fails when two people speak on completely different psychological frequencies. Master the three hidden conversational modes to align brainwaves and unlock effortless, genuine connection.",
      "coreThesis": "Genuine connection requires the Matching Principle: to communicate effectively, you must identify and join the specific conversation channel\\u2014practical, emotional, or social\\u2014the other person is in before trying to persuade, solve, or lead.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Supercommunicators: How to Unlock the Secret Language of Connection"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "superforecasting-the-art-and-science-of-prediction",
    "title": "Superforecasting: The Art and Science of Prediction",
    "author": "Philip E. Tetlock & Dan Gardner",
    "category": "Psychology",
    "subcategory": "Decision Making",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/9142114-M.jpg",
    "readingTimeMinutes": 60,
    "publishedYear": 2015,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Most high-profile forecasters are no better than dart-throwing chimpanzees because they prioritize dogma over scorekeeping. Winning under uncertainty demands running your mind like a probabilistic tournament, not a confirmation-bias machine.",
      "coreThesis": "Foresight is not a rare mystical gift, but an actionable, trainable craft rooted in granular probabilistic thinking, base-rate calibration, and relentless intellectual humility.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Superforecasting: The Art and Science of Prediction"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "superiority-conceit-in-buddhist-traditions",
    "title": "Superiority Conceit in Buddhist Traditions",
    "author": "Bhikkhu Analayo",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10701450-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2021,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Even spiritual paths designed to dissolve the ego end up manufacturing brand-new pedestals of self-importance. Bhikkhu An\\u0101layo investigates how ancient institutions and modern practitioners alike quietly transform tools of freedom into status symbols.",
      "coreThesis": "Conceit is the ego's most resilient survival tactic, stealthily turning the very spiritual frameworks meant to dismantle pride into weapons of tribal and intellectual supremacy.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Superiority Conceit in Buddhist Traditions"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "sync-how-order-emerges-from-chaos",
    "title": "Sync: How Order Emerges from Chaos",
    "author": "Steven Strogatz",
    "category": "Psychology",
    "subcategory": "Human Behavior",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/546339-M.jpg",
    "readingTimeMinutes": 50,
    "publishedYear": 2003,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Beneath nature's chaotic surface lies a hidden drive toward spontaneous coordination. Steven Strogatz reveals how thousands of independent actors lock into effortless, simultaneous harmony.",
      "coreThesis": "Spontaneous order is not an accident but a mathematical inevitability when vibrating agents influence one another through feedback.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Sync: How Order Emerges from Chaos"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "teachings-of-a-buddhist-monk",
    "title": "Teachings of a Buddhist Monk",
    "author": "Ajahn Sumedho",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1990,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop fighting your noisy thoughts and learn the quiet art of laying down your burdens. Ajahn Sumedho offers a refreshingly human, warm guide to waking up inside ordinary life by discovering the unshakeable stillness behind every passing storm.",
      "coreThesis": "Suffering is not caused by life's conditions, but by our clinging to them; genuine freedom is the immediate, effortless release of grasping by resting as the silent knowing awareness.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Teachings of a Buddhist Monk"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "thank-you-for-arguing",
    "title": "Thank You for Arguing",
    "author": "Jay Heinrichs",
    "category": "Creativity & Expression",
    "subcategory": "Logic, Rhetoric & Argument",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/167966-M.jpg",
    "readingTimeMinutes": 140,
    "publishedYear": 2007,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Persuasion is not a battlefield where you obliterate rivals; it is an invisible operating system of human psychology that guides decisions. Learn the mechanics of ancient dialectic to effortlessly steer friction toward consensus.",
      "coreThesis": "Arguing is not fighting to dominate; it is the deliberate science of shifting human desire, trust, and future choices to achieve lasting agreement.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Thank You for Arguing"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "thanks-for-the-feedback-the-science-and-art-of-receiving-fee",
    "title": "Thanks for the Feedback: The Science and Art of Receiving Feedback Well",
    "author": "Douglas Stone & Sheila Heen",
    "category": "Communication",
    "subcategory": "Difficult Conversations",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/9549524-M.jpg",
    "readingTimeMinutes": 65,
    "publishedYear": 2014,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Most feedback advice focuses on how to give critique, but the real power plant sits entirely in the hands of the receiver. Mastering how you absorb, filter, and calibrate incoming information unlocks rapid personal evolution while shielding your sense of self.",
      "coreThesis": "The receiver holds total power in the feedback equation; mastering the internal filters that process critique allows you to learn from anyone without letting them define your worth.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Thanks for the Feedback: The Science and Art of Receiving Feedback Well"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-1-rule",
    "title": "The 1% Rule",
    "author": "Tommy Baker",
    "category": "Productivity",
    "subcategory": "Habits & Routines",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 70,
    "publishedYear": 2018,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Radical success is not built on theatrical, heroic leaps, but on invisible daily micro-improvements that compound quietly beneath the surface. By falling in love with daily execution rather than obsessing over distant outcomes, you transform consistency from a chore into an automatic competitive advantage.",
      "coreThesis": "Monumental achievement is not the result of sudden grand gestures, but the mathematical inevitability of small daily improvements compounded through disciplined systems and process-first devotion.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The 1% Rule"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-5-second-rule",
    "title": "The 5 Second Rule",
    "author": "Mel Robbins",
    "category": "Productivity",
    "subcategory": "Beating Procrastination",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8114155-M.jpg",
    "readingTimeMinutes": 85,
    "publishedYear": 2017,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "You are always one five-second decision away from an entirely different life. When you count backward 5-4-3-2-1 and move immediately, you silence self-doubt and outrun hesitation before your brain can hit the brakes.",
      "coreThesis": "You will rarely feel like doing hard, uncomfortable things; counting backward 5-4-3-2-1 manually activates your prefrontal cortex, enabling you to take immediate physical action before self-doubt paralyzes you.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The 5 Second Rule"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-80-20-principle",
    "title": "The 80/20 Principle",
    "author": "Richard Koch",
    "category": "Productivity",
    "subcategory": "Time Management",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/241591-M.jpg",
    "readingTimeMinutes": 80,
    "publishedYear": 1997,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop mistaking frantic motion for meaningful progress. The 80/20 Principle shows you how to locate the vital 20 percent of your actions, relationships, and decisions that create 80 percent of your real-world momentum\\u2014enabling you to accomplish exponentially more by doing drastically less.",
      "coreThesis": "A predictable minority of causes, inputs, or efforts generates the overwhelming majority of results, rewards, or impacts; peak effectiveness comes from ruthlessly pruning the trivial majority to supercharge the vital few.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The 80/20 Principle"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-accountability-manifesto",
    "title": "The Accountability Manifesto",
    "author": "Sam Silverstein",
    "category": "Productivity",
    "subcategory": "Goal Setting & Execution",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2015,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Relying purely on willpower is a behavioral dead end\\u2014human beings are hardwired to bargain with themselves when no one is looking. By installing structured external observation and social pre-commitments, you turn fragile intentions into automated, non-negotiable execution.",
      "coreThesis": "Accountability is not punitive oversight or an admission of weakness\\u2014it is an engineered behavioral scaffolding that transforms private intentions into observable, non-negotiable reality.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Accountability Manifesto"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-all-embracing-net-of-views-brahmajala-sutta",
    "title": "The All-Embracing Net of Views: Brahmajala Sutta",
    "author": "Bhikkhu Bodhi",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1978,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Step out of the tangled web of opinions, dogmas, and mental debates into the calm clarity of direct awareness. This foundational Buddhist text reveals how all rigid beliefs trap the human heart, and points the way to unshakeable inner peace.",
      "coreThesis": "Every fixed opinion about the self and reality is an unexamined reaction to sensory contact, and complete spiritual freedom is realized not by adopting the right dogma, but by relinquishing the urge to grasp any view whatsoever.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The All-Embracing Net of Views: Brahmajala Sutta"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-anxiety-and-phobia-workbook",
    "title": "The Anxiety and Phobia Workbook",
    "author": "Edmund J. Bourne",
    "category": "Psychology",
    "subcategory": "Anxiety & Stress Relief",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10448829-M.jpg",
    "readingTimeMinutes": 105,
    "publishedYear": 1990,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Anxiety is not a permanent personality defect; it is a hypersensitive alarm system stuck in a runaway feedback loop. This seminal manual provides an exhaustive, field-tested toolkit to systematically decondition physical panic, reprogram cognitive distortions, and rebuild autonomic resilience.",
      "coreThesis": "Panic and anxiety disorders are self-perpetuating feedback loops driven by physiological hyperreactivity and catastrophic cognitive interpretations; systematic bodily down-regulation combined with hierarchical behavioral exposure rewires the brain's alarm system for lasting emotional equilibrium.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Anxiety and Phobia Workbook"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-archetypes-and-the-collective-unconscious",
    "title": "The Archetypes and the Collective Unconscious",
    "author": "Carl G. Jung",
    "category": "Psychology",
    "subcategory": "Personality & Shadow Work",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/262421-M.jpg",
    "readingTimeMinutes": 60,
    "publishedYear": 1959,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your brain does not start as a blank notebook; it ships from the factory preloaded with an ancient, shared operating system. By decoding the hidden archetypes running in your mental background, you stop living on autopilot and take command of your own self-reinvention.",
      "coreThesis": "Human psychology is anchored in a universal, inherited architecture of symbolic archetypes; true maturity and mental resilience come from integrating these hidden operating dynamics into daily conscious life.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Archetypes and the Collective Unconscious"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-art-of-being-right-the-art-of-controversy",
    "title": "The Art of Being Right (The Art of Controversy)",
    "author": "Arthur Schopenhauer",
    "category": "Creativity & Expression",
    "subcategory": "Logic, Rhetoric & Argument",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/13769873-M.jpg",
    "readingTimeMinutes": 200,
    "publishedYear": 1831,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Human debate is rarely a search for truth; it is an instinctual arena where fragile vanity fights for dominance. Schopenhauer dismantles the machinery of verbal combat so you can spot cognitive tricks instantly and stay unshakeable under rhetorical fire.",
      "coreThesis": "Dialectical debate is driven by vanity rather than objective reality; dissecting its bad-faith maneuvers gives you an immune system against manipulation.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Art of Being Right (The Art of Controversy)"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-art-of-communicating",
    "title": "The Art of Communicating",
    "author": "Thich Nhat Hanh",
    "category": "Communication",
    "subcategory": "Active Listening & Empathy",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8738077-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2013,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Communication is an active metabolic system: what you feed your mind directly determines the health of the words you transmit. Master the quiet mechanics of deep listening and conscious speech to defuse conflict before it detonates.",
      "coreThesis": "Relational harmony is governed by input quality and nervous-system calibration: listen deeply to neutralize defensive threat responses, and speak with compassionate precision to sustain healthy social ecosystems.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Art of Communicating"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-art-of-dialogue",
    "title": "The Art of Dialogue",
    "author": "David Bohm",
    "category": "Creativity & Expression",
    "subcategory": "Logic, Rhetoric & Argument",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/1677818-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 1996,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Most arguments fail because people treat conversations like ping-pong matches to win rather than scientific expeditions to discover truth. David Bohm reveals how tapping into the collective stream of dialogue can dissolve ideological gridlock and unlock genuine collective intelligence.",
      "coreThesis": "Human thought functions as a contagious, systemic reflex rather than private wisdom; only by suspending our assumptions in open dialogue can we break defensive feedback loops and access collective intelligence.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Art of Dialogue"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-art-of-everyday-assertiveness",
    "title": "The Art of Everyday Assertiveness",
    "author": "Patrick King",
    "category": "Communication",
    "subcategory": "Boundaries & Assertiveness",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2018,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Assertiveness is neither combative hostility nor fragile submission; it is the precision engineering of personal boundaries that keeps your life functioning without friction. Patrick King reveals how to turn down exploitative requests, dismantle chronic compliance, and communicate your needs with clinical clarity.",
      "coreThesis": "Assertiveness is the indispensable middle path between silent resentment and aggressive hostility, functioning as a clean communication protocol that defends your bandwidth and preserves mutual respect.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Art of Everyday Assertiveness"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-art-of-note-taking",
    "title": "The Art of Note-Taking",
    "author": "Various masters of intellectual journaling",
    "category": "Productivity",
    "subcategory": "Daily Systems & Workflows",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1926,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your brain is designed to generate ideas, not to serve as a warehouse for them. By treating notes as modular physical gears rather than static diary entries, you turn everyday observation into an automated engine of scientific discovery.",
      "coreThesis": "Genuine insight does not happen during capture; it emerges when modular, atomic observations are decoupled from chronological time and physically shuffled into novel structural combinations.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Art of Note-Taking"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-art-of-persuasion",
    "title": "The Art of Persuasion",
    "author": "Bob Burg",
    "category": "Sales & Persuasion",
    "subcategory": "Persuasion & Influence",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/12719675-M.jpg",
    "readingTimeMinutes": 50,
    "publishedYear": 2011,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Persuasion is not a battering ram of aggressive pressure; it is a precision system of emotional de-escalation that invites others into voluntary cooperation. By removing ego friction and protecting the other person's dignity, you get what you want by helping them feel valued, understood, and victorious.",
      "coreThesis": "Genuine persuasion is the art of getting what you want while creating an outcome that leaves the other person genuinely satisfied with themselves and eager to collaborate again.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Art of Persuasion"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-art-of-work",
    "title": "The Art of Work",
    "author": "Jeff Goins",
    "category": "Personal Growth",
    "subcategory": "Purpose & Meaning",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/7345903-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2015,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Vocation is not an exotic destination to be hunted down; it is a quiet, continuous conversation with the life you are already living.",
      "coreThesis": "A calling is not found through an impulsive leap, but assembled over time by listening to your history, embracing disciplined practice, and serving something larger than yourself.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Art of Work"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-assertiveness-workbook",
    "title": "The Assertiveness Workbook",
    "author": "Randy J. Paterson",
    "category": "Communication",
    "subcategory": "Boundaries & Assertiveness",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/9729066-M.jpg",
    "readingTimeMinutes": 80,
    "publishedYear": 2000,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Human communication operates under precise feedback mechanics: silence invites intrusion, aggression triggers counter-defenses, but assertion stabilizes the entire system. Randy Paterson delivers an empirical, cognitive-behavioral operating manual for calibrating your voice, holding your perimeter, and expressing your genuine reality without conflict or capitulation.",
      "coreThesis": "Assertiveness is neither dominance nor submission; it is the transparent, responsible transmission of personal boundaries, needs, and opinions that preserves self-respect while honoring the autonomy of others.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Assertiveness Workbook"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-asynchronous-mindset",
    "title": "The Asynchronous Mindset",
    "author": "Various works on distributed workplace communication protocols.",
    "category": "Communication",
    "subcategory": "Remote & Digital Communication",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2021,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Most modern work feels like a chaotic kitchen where chefs yell across stations instead of following clear tickets. 'The Asynchronous Mindset' rewires work from noisy real-time interruptions to calm, written clarity.",
      "coreThesis": "True productivity is not measured by the velocity of your reply, but by the uninterrupted depth of your output.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Asynchronous Mindset"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-attention-merchants",
    "title": "The Attention Merchants",
    "author": "Tim Wu",
    "category": "Productivity",
    "subcategory": "Focus & Deep Work",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8868199-M.jpg",
    "readingTimeMinutes": 120,
    "publishedYear": 2016,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Human attention has become the planet's most aggressively mined natural resource. Tim Wu charts how media barons, ad agencies, and tech titans spent 180 years converting our waking conscious moments into tradeable commercial real estate.",
      "coreThesis": "Human attention is a finite, precious asset that commercial platforms capture through 'free' services and resell to advertisers, making the deliberate defense of mental boundaries essential to living a sovereign life.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Attention Merchants"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-black-swan",
    "title": "The Black Swan",
    "author": "Nassim Nicholas Taleb",
    "category": "Psychology",
    "subcategory": "Cognitive Biases & Logic",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/5721840-M.jpg",
    "readingTimeMinutes": 95,
    "publishedYear": 2007,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "History is not driven by the predictable daily grind; it is commanded entirely by rare, high-impact shocks. Master strategists survive not by predicting lightning, but by constructing lightning rods and capturing the power.",
      "coreThesis": "Rare, unpredicted shocks govern all complex systems, making detailed forecasting futile. True strategic advantage comes from capping fatal downside while engineering uncapped exposure to positive windfalls.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Black Swan"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "the-body-keeps-the-score",
    "title": "The Body Keeps the Score",
    "author": "Bessel van der Kolk",
    "category": "Health & Longevity",
    "subcategory": "Longevity & Vitality",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8315367-M.jpg",
    "readingTimeMinutes": 100,
    "publishedYear": 2014,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your rational mind can rationalize past hardships, but your physiology remembers every shock wave. Bessel van der Kolk reveals how overwhelming stress physically alters brain wiring, stress hormones, and bodily tissues\\u2014and charts a revolutionary path to reclaim your nervous system through somatic mastery.",
      "coreThesis": "Trauma is not merely a psychological memory of past adversity; it is an active, ongoing physiological miscalibration that reconfigures brain wiring and bodily systems until safety is reclaimed somatically.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Body Keeps the Score"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Finance",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-book-of-boundaries",
    "title": "The Book of Boundaries",
    "author": "Melissa Urban",
    "category": "Communication",
    "subcategory": "Boundaries & Assertiveness",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 60,
    "publishedYear": 2022,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Boundaries are not punitive walls designed to push people out; they are operational guardrails that make long-term connection, professional stamina, and mental clarity sustainable. Melissa Urban replaces exhausting emotional guesswork with a battle-tested, three-tier verbal playbook that protects your finite energy while preserving your most vital relationships.",
      "coreThesis": "A boundary is never an attempt to control another person's actions; it is a clear, compassionate declaration of the actions you will take to protect your own mental and physical capacity.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Book of Boundaries"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-brain-that-changes-itself",
    "title": "The Brain That Changes Itself",
    "author": "Norman Doidge",
    "category": "Productivity",
    "subcategory": "Speed Reading & Learning",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/1333251-M.jpg",
    "readingTimeMinutes": 55,
    "publishedYear": 2007,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your brain is not an immutable machine hardwired in early childhood. It behaves like a living ecosystem that constantly reshapes itself in response to experience.",
      "coreThesis": "The brain physically redesigns its cellular architecture based on what you repeatedly think, feel, and practice. Mental activity drives biological form throughout entire human lifespans.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Brain That Changes Itself"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "the-buddhist-monastic-code-volume-i",
    "title": "The Buddhist Monastic Code, Volume I",
    "author": "Thanissaro Bhikkhu",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 55,
    "publishedYear": 1994,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Far from being dry legalism, this masterpiece reveals Buddhist monastic discipline as high-precision engineering for the human mind. It demonstrates how clean ethical boundaries protect meditation, silence mental chatter, and cultivate fearless inner peace.",
      "coreThesis": "External ethical boundaries are the indispensable foundation of inner stillness; when intention and action are completely harmless, the mind rests in unshakeable clarity.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Buddhist Monastic Code, Volume I"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-buddhist-monastic-code-volume-ii",
    "title": "The Buddhist Monastic Code, Volume II",
    "author": "Thanissaro Bhikkhu",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 120,
    "publishedYear": 2002,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "While modern life treats rules as bureaucratic shackles, this masterwork reveals ancient monastic discipline as the ultimate architecture of freedom. It transforms every routine physical act\\u2014from tailoring a robe to resolving a group grievance\\u2014into razor-sharp mindfulness that dissolves the ego.",
      "coreThesis": "Enlightenment does not occur in an ethical vacuum; meticulous external discipline in material habits and communal harmony creates the unshakeable container required for profound internal stillness and liberation from ego.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Buddhist Monastic Code, Volume II"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-catalyst-how-to-change-anyone-s-mind",
    "title": "The Catalyst: How to Change Anyone's Mind",
    "author": "Jonah Berger",
    "category": "Sales & Persuasion",
    "subcategory": "Persuasion & Influence",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/9295723-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2020,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Most people try to change minds by pushing harder, adding facts, and dialing up the pressure. Real change happens like chemistry: instead of pumping in brute energy, you remove the hidden friction that holds people in place.",
      "coreThesis": "To change someone's mind, stop pushing harder and start removing the barriers preventing them from moving.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Catalyst: How to Change Anyone's Mind"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-checklist-manifesto",
    "title": "The Checklist Manifesto",
    "author": "Atul Gawande",
    "category": "Psychology",
    "subcategory": "Human Behavior",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8231866-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2009,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop relying on sheer willpower and foggy memory to run your high-stakes days. A simple, disciplined checklist removes mental drag and guarantees elite execution every single time.",
      "coreThesis": "Knowledge has outpaced human memory, making simple checklists essential for consistent, flawless performance.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Checklist Manifesto"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "the-circadian-code",
    "title": "The Circadian Code",
    "author": "Satchin Panda",
    "category": "Productivity",
    "subcategory": "Energy & Burnout",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/11112952-M.jpg",
    "readingTimeMinutes": 65,
    "publishedYear": 2018,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your body is not a machine that runs identically at all hours; it is a synchronized orchestra where timing changes everything. By simply aligning when you eat, sleep, move, and seek sunlight, you can unlock effortless energy, sharper focus, and peak health without extreme deprivation.",
      "coreThesis": "Peak energy, sustained health, and metabolic efficiency depend less on what you consume and far more on when you act, because biological clocks dictate optimal windows for digestion, movement, and repair.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Circadian Code"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-coaching-habit-say-less-ask-more-change-the-way-you-lead",
    "title": "The Coaching Habit: Say Less, Ask More & Change the Way You Lead Forever",
    "author": "Michael Bungay Stanier",
    "category": "Communication",
    "subcategory": "Difficult Conversations",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/12515817-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2016,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Most leaders suffer from an 'Advice Monster' reflex that keeps them exhausted and their teams dependent. By replacing quick answers with seven precision questions, you unlock self-reliance, slash micromanagement, and transform how conversations produce real work.",
      "coreThesis": "Telling people answers creates fragile dependency, while disciplined curiosity builds resilient capacity; true leadership lies in staying curious a little longer and rushing to advice a little slower.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Coaching Habit: Say Less, Ask More & Change the Way You Lead Forever"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-compassionate-mind",
    "title": "The Compassionate Mind",
    "author": "Paul Gilbert",
    "category": "Psychology",
    "subcategory": "Emotional Intelligence",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/12177589-M.jpg",
    "readingTimeMinutes": 65,
    "publishedYear": 2009,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your brain is not broken\\u2014it is an ancient survival machine caught in a modern high-pressure feedback loop. Learn the biological mechanics of self-compassion to disarm internal alarm bells and deliberately steer your nervous system toward calm clarity and resilient strength.",
      "coreThesis": "Suffering is not a personal character defect but the natural design glitch of an evolved brain; by actively training our neurobiological soothing system, we disarm internal threat loops and build deep psychological strength.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Compassionate Mind"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-complete-guide-to-fasting",
    "title": "The Complete Guide to Fasting",
    "author": "Jason Fung & Jimmy Moore",
    "category": "Health & Longevity",
    "subcategory": "Nutrition & Metabolism",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/13070933-M.jpg",
    "readingTimeMinutes": 75,
    "publishedYear": 2016,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Fasting is not deliberate starvation\\u2014it is your body's built-in hybrid engine switching from fuel storage to fuel burning. By controlling when you eat rather than just what you eat, you trigger a cellular cleanup cycle that restores insulin sensitivity, strips visceral fat, and sharpens mental focus.",
      "coreThesis": "Obesity and type 2 diabetes are driven by hormonal signaling rather than caloric math; lowering insulin through scheduled fasting unlocks stored body fat and triggers vital cellular repair.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Complete Guide to Fasting"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Finance",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-compound-effect",
    "title": "The Compound Effect",
    "author": "Darren Hardy",
    "category": "Productivity",
    "subcategory": "Habits & Routines",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/7115046-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2010,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Extraordinary success is never delivered by lightning strikes or heroic overnight breakthroughs. It is the mathematical byproduct of tiny, invisible daily choices repeated consistently over long horizons of time.",
      "coreThesis": "Radical lifelong transformation is the mechanical sum of small, smart choices executed consistently over time.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Compound Effect"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-connected-discourses-of-the-buddha-samyutta-nikaya",
    "title": "The Connected Discourses of the Buddha (Samyutta Nikaya)",
    "author": "Bhikkhu Bodhi",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 280,
    "publishedYear": 2000,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Imagine holding the master operating manual for human consciousness. Translated with supreme clarity by Bhikkhu Bodhi, this collection strips away dogma to show you exactly how suffering is manufactured\\u2014and how you can shut down the factory for good.",
      "coreThesis": "Suffering is not an inescapable fate, but a mechanical byproduct of grasping at impermanent things as a permanent self; dismantle the grasping through clear, non-reactive awareness, and freedom naturally reveals itself.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Connected Discourses of the Buddha (Samyutta Nikaya)"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-courage-to-be-disliked",
    "title": "The Courage to Be Disliked",
    "author": "Ichiro Kishimi & Fumitake Koga",
    "category": "Personal Growth",
    "subcategory": "Authenticity & Self-Worth",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/15179268-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2013,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your past does not control your present; the unspoken goals you choose right now dictate your entire life. By drawing sharp boundary lines between what is your duty and what belongs to others, you unlock immediate, unshakeable freedom.",
      "coreThesis": "Happiness is not something awarded by external approval; it is an internal choice unlocked by separating your own responsibilities from other people's expectations and living fully in the present moment.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Courage to Be Disliked"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-craft-of-the-heart",
    "title": "The Craft of the Heart",
    "author": "Ajahn Lee Dhammadharo",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 175,
    "publishedYear": 1939,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Mastering your own mind is not an abstract mystical dream\\u2014it is an exact, hands-on craft akin to fine woodworking or tuning an engine. Ajahn Lee provides a no-nonsense workshop manual that trains your breath and attention to dissolve mental friction and uncover unshakable peace.",
      "coreThesis": "Genuine inner liberation is an attainable practical trade: by purifying your ethical conduct and mastering conscious breath awareness, you dismantle mental agitation and reveal an indestructible wellspring of clarity and peace.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Craft of the Heart"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-crossroads-of-should-and-must",
    "title": "The Crossroads of Should and Must",
    "author": "Elle Luna",
    "category": "Personal Growth",
    "subcategory": "Purpose & Meaning",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8138390-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2015,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Every day you stand at a quiet fork in the trail: walk the well-paved highway of other people's expectations, or step onto the steep path of your authentic calling. Choosing your calling is not an act of selfish rebellion, but a quiet, necessary pilgrimage toward genuine inner peace and wholeness.",
      "coreThesis": "Human life continually bifurcates into Should\\u2014the inherited demands of external conditioning\\u2014and Must\\u2014the quiet, unavoidable duty to live out one's genuine nature. True equanimity is achieved only when we summon the courage to choose Must and share its fruit with the world.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Crossroads of Should and Must"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-crowd-a-study-of-the-popular-mind",
    "title": "The Crowd: A Study of the Popular Mind",
    "author": "Gustave Le Bon",
    "category": "Psychology",
    "subcategory": "Social Psychology",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10441573-M.jpg",
    "readingTimeMinutes": 60,
    "publishedYear": 1895,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "When sensible people gather in a group, their personal intellect melts into a single, highly emotional collective creature. Discover the hidden social physics behind viral hysterias, market panics, and magnetic political movements.",
      "coreThesis": "An individual inside a crowd surrenders rational self-command, merging into a unified collective organism ruled entirely by vivid imagery, unconscious impulses, and rapid emotional contagion.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Crowd: A Study of the Popular Mind"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-dance-of-anger",
    "title": "The Dance of Anger",
    "author": "Harriet Lerner",
    "category": "Psychology",
    "subcategory": "Mental Health & Healing",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/32974-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 1985,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Anger is not a destructive defect to extinguish\\u2014it is an engine warning light alerting you that your boundaries are leaking. Discover how changing your own predictable relational steps permanently rewires the entire interactive dance.",
      "coreThesis": "Anger is an internal signal pointing to an unaddressed boundary or loss of self; lasting change comes not from fighting to reform the other person, but from altering your own steps in the systemic dance.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Dance of Anger"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-dawn-of-abhidharma",
    "title": "The Dawn of Abhidharma",
    "author": "Bhikkhu Analayo",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10867428-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2014,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Bhikkhu An\\u0101layo operates like an intellectual forensic investigator, tracing how early Buddhism's lean, experiential survival guide got reverse-engineered into an encyclopedic cognitive operating system. It reveals the exact mechanics through which practical mindfulness routines evolved into scholastic architecture.",
      "coreThesis": "The Abhidharma evolved organically from early communal recitation checklists into an intricate psychological architecture, demonstrating how practical contemplative insights inevitably systematize, abstract, and seek retrospective authority as traditions mature.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Dawn of Abhidharma"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-dip-a-little-book-that-teaches-you-when-to-quit",
    "title": "The Dip: A Little Book That Teaches You When to Quit",
    "author": "Seth Godin",
    "category": "Personal Growth",
    "subcategory": "Life Transitions & Reinvention",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/1977228-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2007,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Winners do not endure everything blindly\\u2014they aggressively quit dead ends early so they can pour all their fuel into breaking through the one barrier that actually matters. In any complex system, the grueling slog in the middle is not a design flaw; it is the exact moat that filters out the competition.",
      "coreThesis": "Scarcity creates disproportionate value, and The Dip is the natural barrier that creates scarcity; therefore, quit dead ends immediately to concentrate all resources on conquering the one Dip that leads to mastery.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Dip: A Little Book That Teaches You When to Quit"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-discourse-on-the-root-of-existence-mulapariyaya-sutta",
    "title": "The Discourse on the Root of Existence: Mulapariyaya Sutta",
    "author": "Bhikkhu Bodhi",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 60,
    "publishedYear": 1980,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Suffering is not caused by the world itself, but by the quiet mental reflex that turns naked experience into 'me' and 'mine.' Bhikkhu Bodhi illuminates the Buddha's most radical map for unmasking this illusion, pointing directly to natural, unconditioned freedom.",
      "coreThesis": "Suffering arises because consciousness habitually superimposes the illusion of a self onto neutral phenomena; total liberation comes from meeting direct experience without building an identity upon it.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Discourse on the Root of Existence: Mulapariyaya Sutta"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-disease-to-please-curing-the-people-pleasing-syndrome",
    "title": "The Disease to Please: Curing the People-Pleasing Syndrome",
    "author": "Harriet B. Braiker",
    "category": "Personal Growth",
    "subcategory": "Authenticity & Self-Worth",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/1077092-M.jpg",
    "readingTimeMinutes": 75,
    "publishedYear": 2001,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "People-pleasing is not a benign personality quirk or noble virtue; it is a compulsive psychological syndrome fueled by approval addiction, catastrophic fear of conflict, and self-erasing habits. Dr. Harriet Braiker provides a rigorous, eye-opening diagnosis and a laboratory-tested 21-day blueprint to cure chronic compliance and reclaim your authentic autonomy.",
      "coreThesis": "People-pleasing is a compulsive survival mechanism driven by cognitive distortions and fear of negative emotions, which can only be cured by systematically breaking approval addiction and installing firm boundaries.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Disease to Please: Curing the People-Pleasing Syndrome"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-distracted-mind-ancient-brains-in-a-high-tech-world",
    "title": "The Distracted Mind: Ancient Brains in a High-Tech World",
    "author": "Adam Gazzaley & Larry D. Rosen",
    "category": "Productivity",
    "subcategory": "Focus & Deep Work",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8882160-M.jpg",
    "readingTimeMinutes": 55,
    "publishedYear": 2016,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Human brains are ancient biological foraging engines built for survival, suddenly thrust into an endless digital buffet engineered for distraction. Discover the exact neurological mismatch sabotaging your attention and the practical scientific blueprint to reclaim cognitive mastery.",
      "coreThesis": "Human attention suffers from an evolutionary mismatch between ancient, limited-capacity cognitive control systems and hyper-connected information environments; conquering distraction requires both upgrading our biological hardware and systematically engineering our external conditions.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Distracted Mind: Ancient Brains in a High-Tech World"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-divided-mind-the-epidemic-of-mindbody-disorders",
    "title": "The Divided Mind: The Epidemic of Mindbody Disorders",
    "author": "John E. Sarno",
    "category": "Health & Longevity",
    "subcategory": "Longevity & Vitality",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/47003-M.jpg",
    "readingTimeMinutes": 50,
    "publishedYear": 2006,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your chronic back pain, recurring migraines, and gut flares are rarely mechanical breakdowns\\u2014they are your brain's clever decoy strategy to divert attention from unacknowledged emotional pressure. Unmask the psychological decoy, and the physical fire alarm turns off on its own.",
      "coreThesis": "Chronic pain is frequently a purposeful, brain-orchestrated distraction designed to protect us from experiencing intolerable repressed emotions; exposing this mechanism neutralizes the pain at its physiological root.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Divided Mind: The Epidemic of Mindbody Disorders"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Finance",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-easy-way-to-stop-smoking-stop-drinking",
    "title": "The Easy Way to Stop Smoking / Stop Drinking",
    "author": "Allen Carr",
    "category": "Productivity",
    "subcategory": "Beating Procrastination",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 220,
    "publishedYear": 1985,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Addiction is not a comforting sanctuary you sacrifice, but a sinister cognitive trap where every dose merely cures the chemical withdrawal created by the previous one. By dismantling subconscious brainwashing rather than fighting physical cravings with willpower, you don't surrender a friend\\u2014you escape an engineered parasite.",
      "coreThesis": "Addiction provides zero genuine pleasure or psychological crutch; it is an engineered feedback loop where each dose merely relieves the chemical withdrawal caused by the preceding dose. When you eliminate the cognitive illusion of sacrifice, the physical habit collapses effortlessly.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Easy Way to Stop Smoking / Stop Drinking"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-evolution-of-desire-strategies-of-human-mating",
    "title": "The Evolution of Desire: Strategies of Human Mating",
    "author": "David M. Buss",
    "category": "Psychology",
    "subcategory": "Evolutionary Psychology",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/3937405-M.jpg",
    "readingTimeMinutes": 50,
    "publishedYear": 1994,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Human attraction is neither a mystical accident nor a modern social invention; it is a precision-engineered biological guidance system shaped over hundreds of thousands of years. David M. Buss lifts the hood on romantic behavior, revealing the ancient evolutionary blueprints that dictate whom we desire, why we compete, and how we stay together.",
      "coreThesis": "Human romance, desire, and heartbreak are driven by evolved psychological adaptations designed to solve distinct ancestral mating challenges, which we can navigate consciously once we decode their underlying mechanisms.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Evolution of Desire: Strategies of Human Mating"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-fifth-discipline",
    "title": "The Fifth Discipline",
    "author": "Peter M. Senge",
    "category": "Psychology",
    "subcategory": "Human Behavior",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/5306808-M.jpg",
    "readingTimeMinutes": 105,
    "publishedYear": 1990,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Most teams fail because they treat isolated symptoms rather than invisible circular feedback loops. Master the hidden physics of organizational learning to unlock breakthrough collective intelligence.",
      "coreThesis": "Organizations excel only when they abandon linear blame and treat challenges as interdependent feedback systems.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Fifth Discipline"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "the-five-mental-hindrances-and-their-conquest",
    "title": "The Five Mental Hindrances and Their Conquest",
    "author": "Nyanaponika Thera",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1961,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your mind is naturally pristine and clear like mountain water, but daily life continually stirs up sediment, heat, and weeds. Master the five universal mental traps that rob you of clarity, and discover how quiet, compassionate observation dissolves inner friction without brute struggle.",
      "coreThesis": "The five hindrances are temporary mental contaminants, not your true identity; by meeting them with precise mindfulness and targeted remedies, their power evaporates and natural inner peace returns.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Five Mental Hindrances and Their Conquest"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-forty-rules-of-love",
    "title": "The Forty Rules of Love",
    "author": "Elif Shafak",
    "category": "Spirituality",
    "subcategory": "Sufism & Divine Love",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/9078986-M.jpg",
    "readingTimeMinutes": 475,
    "publishedYear": 2009,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "When a settled woman reads an unpublished tale of a wandering mystic and a legendary poet, her tidy suburban life cracks open. Elif Shafak weaves a luminous tapestry showing that love is not a gentle ornament, but a wild fire that breaks us open to remake us whole.",
      "coreThesis": "Divine love demands the dismantling of the ego, proving that true spiritual awakening begins only when we risk security to embrace vulnerable connection.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Forty Rules of Love"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Core Insights"
    ]
  },
  {
    "id": "the-foundation-conditions-for-nirvana",
    "title": "The Foundation Conditions for Nirvana",
    "author": "Bhikkhu Analayo",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2023,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Nirvana is not an exotic otherworldly destination; it is the silent engine room of perception when you stop manufacturing mental clutter. Bhikkhu An\\u0101layo decodes early meditation records with scientific precision to reveal the exact mechanics of inner liberation.",
      "coreThesis": "Awakening is not something manufactured; it is what remains when you dismantle the habitual mental habit of stamping raw reality with subjective emotional labels.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Foundation Conditions for Nirvana"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-four-foundations-of-mindfulness",
    "title": "The Four Foundations of Mindfulness",
    "author": "Sayadaw U Silananda",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1990,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Sayadaw U Silananda unpacks Buddhism's core manual on liberation, turning ancient meditation scripture into an exact, step-by-step training guide for modern living. By learning to observe the body, feelings, mind, and reality without clinging, you dismantle anxiety at the root and uncover unflappable peace.",
      "coreThesis": "Suffering dissolves when you stop mistaking fleeting physical and mental events for a solid, permanent 'self.' Sustained, non-judgmental awareness of the present moment reveals things as they actually are and delivers unshakable liberation.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Four Foundations of Mindfulness"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-four-noble-truths",
    "title": "The Four Noble Truths",
    "author": "Ajahn Sumedho",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1992,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Suffering is not a personal defect or an inevitable life sentence\\u2014it is simply friction caused by clutching tightly to things that constantly move. By shifting from dramatic personal grievance to quiet, direct observation, you unlock immediate inner peace in the middle of everyday chaos.",
      "coreThesis": "Suffering occurs only when the mind clings to passing conditions; by recognizing tension objectively and releasing attachment, immediate peace naturally reveals itself.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Four Noble Truths"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-four-nutriments-of-life",
    "title": "The Four Nutriments of Life",
    "author": "Nyanaponika Thera",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1967,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Life is not an unmoving solid statue; it is an open flame that must constantly burn fresh fuel to survive. By clearly seeing the four physical and psychological 'foods' you consume every second, you break unconscious cravings and uncover unshakable inner freedom.",
      "coreThesis": "Every aspect of human existence\\u2014from physical flesh to personal identity\\u2014is a conditioned process sustained solely by what it consumes; inspecting and calming your intake of physical, sensory, and mental fuel dissolves the illusion of an ego and brings lasting peace.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Four Nutriments of Life"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-four-sublime-states-brahma-vihara",
    "title": "The Four Sublime States: Brahma-Vihara",
    "author": "Nyanaponika Thera",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1958,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Nyanaponika Thera distills the ancient Buddhist practice of the Four Sublime States into a profound blueprint for emotional freedom and boundless goodwill. It teaches you how to systematically train your mind so compassion and serenity become your natural baseline, rather than fleeting accidental moods.",
      "coreThesis": "Genuine inner peace and social freedom arise when the heart systematically replaces self-centered reactions with four boundless, mutually balancing mental states: unconditional goodwill, courageous compassion, shared joy, and insight-grounded equanimity.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Four Sublime States: Brahma-Vihara"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-genesis-of-the-bodhisattva-ideal",
    "title": "The Genesis of the Bodhisattva Ideal",
    "author": "Bhikkhu Analayo",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/14424155-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2010,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "What if the iconic spiritual hero wasn't born as an untouchable blueprint, but evolved step-by-step like a software patch through human storytelling? Bhikkhu An\\u0101layo investigates ancient source code to reveal how ordinary trial-and-error human growth was gradually reverse-engineered into a cosmic ideal.",
      "coreThesis": "The bodhisattva ideal was not a monolithic, pre-planned doctrine, but an organic textual evolution that retrofitted an ordinary seeker's fallible human struggles into a cosmic, replicable blueprint of universal awakening.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Genesis of the Bodhisattva Ideal"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-gifts-of-imperfection",
    "title": "The Gifts of Imperfection",
    "author": "Bren\\u00e9 Brown",
    "category": "Personal Growth",
    "subcategory": "Authenticity & Self-Worth",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/7237826-M.jpg",
    "readingTimeMinutes": 65,
    "publishedYear": 2010,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Human beings are wired for deep social connection, yet we systematically sabotage our own belonging by running an exhaustingly brittle operating system: perfectionism. Bren\\u00e9 Brown unpacks a decade of qualitative behavioral research to reveal how dismantling our protective armor unlocks genuine emotional resilience.",
      "coreThesis": "Worthiness has no entrance prerequisites; lasting belonging arises not from flawless performance, but from cultivating the daily courage to be seen in all our messy, imperfect reality.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Gifts of Imperfection"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-great-discourse-on-causation-mahanidana-sutta",
    "title": "The Great Discourse on Causation: Mahanidana Sutta",
    "author": "Bhikkhu Bodhi",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 60,
    "publishedYear": 1984,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "When you pull on a single thread of personal suffering, you find the entire fabric of human conditioning attached to it. Bhikkhu Bodhi unlocks the Buddha's definitive masterclass on causation to reveal how untangling cause and effect dissolves the illusion of the separate ego.",
      "coreThesis": "Suffering and identity are not fixed entities, but reciprocal processes sustained by interlocking conditions; seeing how they arise naturally dissolves the illusion of an ego and brings liberation.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Great Discourse on Causation: Mahanidana Sutta"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-great-mental-models-vol-1-2",
    "title": "The Great Mental Models (Vol 1 & 2)",
    "author": "Shane Parrish",
    "category": "Psychology",
    "subcategory": "Cognitive Biases & Logic",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/9778922-M.jpg",
    "readingTimeMinutes": 70,
    "publishedYear": 2019,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Reality operates on timeless systemic rules rather than chaotic randomness. Mastering core mental models gives you high-definition lenses to decode human nature and sound decision-making.",
      "coreThesis": "Better thinking is not about acquiring raw facts; it is about applying multidisciplinary mental models to navigate reality accurately.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Great Mental Models (Vol 1 & 2)"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "the-heart-of-practice-ajaan-mun-s-dhamma-sermons",
    "title": "The Heart of Practice: Ajaan Mun's Dhamma Sermons",
    "author": "Ajahn Mun Bhuridatto",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 85,
    "publishedYear": 1950,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Cut through endless intellectual theory and discover the radiant stillness already resting at the center of your awareness. Ajahn Mun strips away philosophical clutter to reveal meditation as a practical, uncompromising craft of inner liberation.",
      "coreThesis": "Suffering is maintained by clinging to mental fabrications, but when continuous awareness inspects the heart directly, defilements dissolve and original radiance is restored.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Heart of Practice: Ajaan Mun's Dhamma Sermons"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-information-diet",
    "title": "The Information Diet",
    "author": "Clay A. Johnson",
    "category": "Productivity",
    "subcategory": "Daily Systems & Workflows",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/7089728-M.jpg",
    "readingTimeMinutes": 55,
    "publishedYear": 2012,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Just as our biology craves sugar and fat in an age of processed food abundance, our brains crave sensationalism and validation in an age of algorithmic media. Clay Johnson delivers the ultimate nutritional guide for your mind, teaching you to curate high-signal information and build lasting cognitive fitness.",
      "coreThesis": "Just as physical health is determined by what we put into our bodies, mental clarity and civic competence are determined by the quality and discipline of the information we consume.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Information Diet"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-invisible-gorilla-how-our-intuitions-deceive-us",
    "title": "The Invisible Gorilla: How Our Intuitions Deceive Us",
    "author": "Christopher Chabris & Daniel Simons",
    "category": "Psychology",
    "subcategory": "Human Behavior",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8665878-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2010,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "We believe our senses capture reality like an HD dashboard camera, yet our minds routinely miss enormous details right in front of us. This eye-opening work dismantles everyday intuitions to show where human perception short-circuits\\u2014and how to see clearly.",
      "coreThesis": "Our intuitions give us a convincing feeling of total awareness, yet our minds operate through severe, predictable illusions of attention, memory, confidence, knowledge, cause, and potential. Real mastery begins by accepting these mental limits and structuring external checks around them.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Invisible Gorilla: How Our Intuitions Deceive Us"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-island-an-anthology-of-the-buddha-s-teachings-on-nibbana",
    "title": "The Island: An Anthology of the Buddha's Teachings on Nibbana",
    "author": "Ajahn Pasanno & Ajahn Amaro",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 90,
    "publishedYear": 2009,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Nibb\\u0101na is not a distant, mythical heaven or cold void\\u2014it is the cool, unshakeable sanctuary of awareness available right now when you stop adding fuel to the fires of mental reactivity. This definitive anthology maps the Buddha's most direct teachings on liberation, translating ancient canonical wisdom into practical, everyday awakening.",
      "coreThesis": "Liberation is not an exotic destination to be attained in the future, but the cool, unconditioned peace that naturally reveals itself when the mind stops fueling reactivity and clinging.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Island: An Anthology of the Buddha's Teachings on Nibbana"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-karma-of-questions-essays-on-the-buddhist-path",
    "title": "The Karma of Questions: Essays on the Buddhist Path",
    "author": "Thanissaro Bhikkhu",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 60,
    "publishedYear": 2002,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your questions are not passive queries\\u2014they are the blueprints molding your reality, suffering, and freedom. Thanissaro Bhikkhu reveals Buddhist practice not as vague mystical surrender, but as an active master craft of questioning, testing, and mastering the mind.",
      "coreThesis": "Every question you ask is an intentional action that shapes your experience; liberation is realized by asking skillful questions that actively dismantle suffering and verify freedom for yourself.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Karma of Questions: Essays on the Buddhist Path"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-key-to-liberation",
    "title": "The Key to Liberation",
    "author": "Ajahn Chah",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1999,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Liberation is not an unreachable mystical summit; it is the natural, unshakeable calm discovered when you stop chasing pleasant thoughts and stop running from unpleasant ones.",
      "coreThesis": "Freedom from suffering comes not from controlling your thoughts or arranging perfect conditions, but from observing every arising experience with non-clinging awareness.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Key to Liberation"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-life-of-sariputta",
    "title": "The Life of Sariputta",
    "author": "Nyanaponika Thera",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1987,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Step into the inner life of the Buddha's greatest student and discover how razor-sharp intellect transforms into radical inner peace. This classic biography reveals how pure clarity, deep humility, and everyday mindfulness dismantle anxiety and anchor your mind in unwavering calm.",
      "coreThesis": "Supreme wisdom is not cold intellectual analysis; it is the calm, direct recognition of mental states as fleeting events, freeing the heart to act with boundless patience and humility.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Life of Sariputta"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-logic-of-scientific-discovery",
    "title": "The Logic of Scientific Discovery",
    "author": "Karl Popper",
    "category": "Psychology",
    "subcategory": "Decision Making",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 50,
    "publishedYear": 1934,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "No amount of white swan sightings can prove all swans are white, yet a single black swan shatters the claim forever. Progress thrives not by protecting our cherished beliefs, but by deliberately hunting for the flaw that breaks them.",
      "coreThesis": "Scientific knowledge advances not by verifying theories through repeated observations, but by subjecting bold, falsifiable guesses to relentless attempts at refutation.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Logic of Scientific Discovery"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "the-lucifer-effect-understanding-how-good-people-turn-evil",
    "title": "The Lucifer Effect: Understanding How Good People Turn Evil",
    "author": "Philip Zimbardo",
    "category": "Psychology",
    "subcategory": "Social Psychology",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/1538373-M.jpg",
    "readingTimeMinutes": 80,
    "publishedYear": 2007,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Human cruelty is rarely born from rotten internal souls\\u2014it is manufactured by bad barrels and flawed operating systems. Philip Zimbardo reveals the hidden social machinery that drives ordinary, decent people to commit unspeakable harm, alongside the everyday blueprint to resist it.",
      "coreThesis": "Human behavior is shaped far more by surrounding situational forces and systemic design than by static character traits. To prevent cruelty and foster everyday integrity, we must fix the barrels and build the situational courage to resist.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Lucifer Effect: Understanding How Good People Turn Evil"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-memory-book",
    "title": "The Memory Book",
    "author": "Harry Lorayne & Jerry Lucas",
    "category": "Productivity",
    "subcategory": "Speed Reading & Learning",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/4996607-M.jpg",
    "readingTimeMinutes": 135,
    "publishedYear": 1974,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your brain is not a sieve; it is an extraordinary visual search engine trapped beneath bad indexing habits. By converting slippery abstractions into vivid mental snapshots, this book hands you the blueprint for an unshakeable, photographic memory.",
      "coreThesis": "Memory is not an innate genetic container but a trained visual indexing habit: any abstract data can be permanently recalled by translating it into vivid, exaggerated physical imagery and anchoring it to a known reference point.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Memory Book"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-middle-length-discourses-of-the-buddha-majjhima-nikaya",
    "title": "The Middle Length Discourses of the Buddha (Majjhima Nikaya)",
    "author": "Bhikkhu Nanamoli & Bhikkhu Bodhi",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 760,
    "publishedYear": 1995,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Step directly into the lively, practical dialogues of the historical Buddha as he diagnoses the mechanics of human discontent and reveals the exact, repeatable blueprint for lasting peace. Far from abstract dogma, this is a hands-on field manual for training attention, clearing emotional clutter, and waking up to reality right where you are.",
      "coreThesis": "Suffering is not an inescapable fate, but a mechanical friction generated whenever an untamed mind clings to fleeting experiences as a rigid self; by seeing things as they actually are, this friction permanently dissolves.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Middle Length Discourses of the Buddha (Majjhima Nikaya)"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-mind-and-the-way-buddhist-reflections-on-life",
    "title": "The Mind and the Way: Buddhist Reflections on Life",
    "author": "Ajahn Sumedho",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 80,
    "publishedYear": 1995,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop fighting the weather of your own mind. Ajahn Sumedho shows how stepping back from mental chatter into calm, spacious awareness transforms daily stress into effortless peace.",
      "coreThesis": "Suffering is created when we fight reality and cling to fleeting mental states; freedom is found by resting in the silent, spacious awareness that observes life exactly as it is.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Mind and the Way: Buddhist Reflections on Life"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-mind-that-knows",
    "title": "The Mind That Knows",
    "author": "Ajahn Anan",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2018,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop wrestling with your wandering thoughts and discover the quiet observer already looking through your eyes. Ajahn Anan reveals how awakening is not a distant summit to conquer, but an immediate return to the untainted awareness that knows every passing moment.",
      "coreThesis": "Suffering occurs only when you mistake passing mental weather for your true identity; freedom is remembering that you are the silent, unshakeable awareness that knows the storm.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Mind That Knows"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-model-thinker",
    "title": "The Model Thinker",
    "author": "Scott E. Page",
    "category": "Psychology",
    "subcategory": "Decision Making",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8827704-M.jpg",
    "readingTimeMinutes": 120,
    "publishedYear": 2018,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Step into the control room of human reality, where simple mathematical lenses crack open hidden social machinery. No single lens shows the whole picture, but a diverse toolkit reveals the invisible gears driving our chaotic world.",
      "coreThesis": "Wisdom springs from an ensemble of diverse formal models, because overlapping analytical lenses cancel out individual blind spots. A single model is only a helpful caricature, but many models unlock deep systemic comprehension.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Model Thinker"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "the-moral-animal",
    "title": "The Moral Animal",
    "author": "Robert Wright",
    "category": "Psychology",
    "subcategory": "Evolutionary Psychology",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/421271-M.jpg",
    "readingTimeMinutes": 90,
    "publishedYear": 1994,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Human morality is not a divine compass, but a masterfully crafted evolutionary toolkit designed to help social primates survive and reproduce. By exposing the hidden biological wiring behind our noble virtues and selfish hypocrisies, Robert Wright shows how understanding our primal design is the only way to genuinely master it.",
      "coreThesis": "Our moral sentiments, romantic yearnings, and social ideals were forged by natural selection to propagate genes, not to deliver objective truth or universal goodwill; recognizing our built-in hypocrisies is the prerequisite for genuine moral growth.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Moral Animal"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-narcissist-you-know",
    "title": "The Narcissist You Know",
    "author": "Joseph Burgo",
    "category": "Psychology",
    "subcategory": "Personality & Shadow Work",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/12181991-M.jpg",
    "readingTimeMinutes": 55,
    "publishedYear": 2015,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Behind every arrogant posture, bullying tirade, and manipulative charmer lurks an unbearable core of hidden shame. Clinical psychologist Joseph Burgo unmasks the spectrum of extreme narcissism and provides a practical, field-tested toolkit to protect your sanity without getting pulled into their crossfire.",
      "coreThesis": "Extreme narcissism is an unconscious, armor-plated defense mechanism designed to repel deep-seated shame by constantly projecting defectiveness and inferiority onto others.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Narcissist You Know"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-noble-eightfold-path-way-to-the-end-of-suffering",
    "title": "The Noble Eightfold Path: Way to the End of Suffering",
    "author": "Bhikkhu Bodhi",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1984,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Suffering is not a life sentence\\u2014it is an internal friction created by misperceiving reality. Bhikkhu Bodhi delivers a masterclass on the Buddha's timeless blueprint, showing how eight interconnected habits systematically untangle anxiety and deliver unshakeable inner peace.",
      "coreThesis": "Suffering arises because we mistake transient sensations for a solid, permanent self; liberation is realized by cultivating an integrated training in ethical harmony, calm focus, and penetrating experiential wisdom.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Noble Eightfold Path: Way to the End of Suffering"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-noonday-demon-an-atlas-of-depression",
    "title": "The Noonday Demon: An Atlas of Depression",
    "author": "Andrew Solomon",
    "category": "Psychology",
    "subcategory": "Mental Health & Healing",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/7121357-M.jpg",
    "readingTimeMinutes": 60,
    "publishedYear": 2001,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "What if depression isn't just severe sadness, but an acute loss of emotional vitality and agency? Andrew Solomon constructs an exhaustive, compassionate master atlas mapping the neurological, chemical, historical, and cultural terrain of human despair.",
      "coreThesis": "Depression is not the presence of sadness, but the total absence of emotional vitality; enduring recovery requires integrating pharmacological calibration, therapeutic restructuring, and deep communal support into a permanent personal maintenance ecosystem.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Noonday Demon: An Atlas of Depression"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-now-habit",
    "title": "The Now Habit",
    "author": "Neil Fiore",
    "category": "Productivity",
    "subcategory": "Beating Procrastination",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8231849-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 1989,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop fighting your willpower and cure procrastination by scheduling guilt-free rest and play first. When work is no longer an open-ended prison sentence, your natural drive and focus instantly turn back on.",
      "coreThesis": "Procrastination is an emotional defense mechanism against fear and unrewarded pressure; when you guarantee guilt-free play and replace coercive self-talk with short, focused starting sprints, productive momentum becomes automatic.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Now Habit"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-numerical-discourses-of-the-buddha-anguttara-nikaya",
    "title": "The Numerical Discourses of the Buddha (Anguttara Nikaya)",
    "author": "Bhikkhu Bodhi",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 55,
    "publishedYear": 2012,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "The Buddha's most practical handbook of liberation, systematically categorized from ones to elevens like a master blueprint for human consciousness. It cuts through mystification to show how steady awareness, calm discipline, and clear seeing dissolve everyday suffering.",
      "coreThesis": "Suffering is not an inevitable life sentence; it is a mechanical byproduct of an uninspected mind that dissolves completely when wholesome habits, steady awareness, and clear insight are methodically cultivated.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Numerical Discourses of the Buddha (Anguttara Nikaya)"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-obesity-code",
    "title": "The Obesity Code",
    "author": "Jason Fung",
    "category": "Health & Longevity",
    "subcategory": "Nutrition & Metabolism",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/12398696-M.jpg",
    "readingTimeMinutes": 100,
    "publishedYear": 2016,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Obesity is not a moral failing of willpower or a simple mathematical mistake of calories, but an internal hormonal thermostat stuck on high. By understanding that insulin commands the body to hoard fuel, you can use dietary composition and meal timing to reset your metabolic gauge.",
      "coreThesis": "Obesity is a multihormonal disorder of energy partitioning driven by chronically elevated insulin and insulin resistance, not a simple caloric surplus.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Obesity Code"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Finance",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-one-thing",
    "title": "The ONE Thing",
    "author": "Gary Keller & Jay Papasan",
    "category": "Productivity",
    "subcategory": "Time Management",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10351762-M.jpg",
    "readingTimeMinutes": 90,
    "publishedYear": 2013,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Extraordinary results are rarely the product of working harder; they come from aiming all your energy at a single lead domino that topples every other obstacle. Master the art of extreme focus, protect your peak hours, and watch clarity replace burnout.",
      "coreThesis": "Extraordinary success is sequential, not simultaneous: by identifying and executing your single most impactful priority first, everything else becomes easier or unnecessary.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The ONE Thing"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-oxygen-advantage",
    "title": "The Oxygen Advantage",
    "author": "Patrick McKeown",
    "category": "Health & Longevity",
    "subcategory": "Breathwork & Somatics",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/13759322-M.jpg",
    "readingTimeMinutes": 80,
    "publishedYear": 2015,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Most people believe taking huge gulps of air delivers more oxygen, but modern science reveals the exact opposite: overbreathing starves your muscles and brain. By learning to breathe less through your nose, you unlock hidden endurance, sharper focus, and natural altitude conditioning without leaving sea level.",
      "coreThesis": "Oxygen delivery to your vital tissues is governed not by how deeply you inhale, but by how efficiently you conserve carbon dioxide through quiet, rhythmic nasal breathing.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Oxygen Advantage"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Finance",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-paradox-of-becoming-finding-freedom-in-the-cycle-of-becoming",
    "title": "The Paradox of Becoming: Finding Freedom in the Cycle of Becoming",
    "author": "Thanissaro Bhikkhu",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2008,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "You cannot escape suffering by trying to destroy your ego; you escape by using a healthy, focused mind as a practical raft until you reach the opposite shore.",
      "coreThesis": "Liberation does not come from destroying the self, but from skillfully using a disciplined identity and focused stillness as a temporary raft to cross beyond all identity.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Paradox of Becoming: Finding Freedom in the Cycle of Becoming"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-paradox-of-choice",
    "title": "The Paradox of Choice",
    "author": "Barry Schwartz",
    "category": "Psychology",
    "subcategory": "Decision Making",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/20382-M.jpg",
    "readingTimeMinutes": 55,
    "publishedYear": 2004,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Modern culture promises that multiplying choices multiplies freedom, but cognitive mechanics reveal the exact opposite. Too many paths trigger analysis paralysis, inflated expectations, and relentless self-blame.",
      "coreThesis": "Unrestrained choice transforms freedom into mental paralysis and chronic regret. Cultivating voluntary constraints and choosing 'good enough' reliably unlocks genuine well-being.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Paradox of Choice"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "the-path-made-clear",
    "title": "The Path Made Clear",
    "author": "Oprah Winfrey",
    "category": "Personal Growth",
    "subcategory": "Purpose & Meaning",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/9171500-M.jpg",
    "readingTimeMinutes": 50,
    "publishedYear": 2019,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your life is speaking to you every single day through quiet nudges and gut instincts. When you learn to listen to those subtle whispers, your authentic purpose unfolds with calm clarity.",
      "coreThesis": "Your purpose is not an elusive prize to chase, but an inner compass already active inside you that demands quiet listening, disciplined alignment, and selfless service.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Path Made Clear"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-polyvagal-theory-in-therapy",
    "title": "The Polyvagal Theory in Therapy",
    "author": "Deb Dana",
    "category": "Health & Longevity",
    "subcategory": "Breathwork & Somatics",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8828442-M.jpg",
    "readingTimeMinutes": 70,
    "publishedYear": 2018,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your thoughts and moods do not drive your body; your autonomic nervous system drives your thoughts and moods. Deb Dana decodes the biological operating system running beneath conscious awareness, giving you a practical toolkit to steer out of survival panic and anchor into calm connection.",
      "coreThesis": "Our internal state dictates our story: physiological safety is the prerequisite for rational thinking, clear communication, and emotional resilience.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Polyvagal Theory in Therapy"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Finance",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-power-of-a-positive-no-how-to-say-no-and-still-get-to-ye",
    "title": "The Power of a Positive No: How to Say No and Still Get to Yes",
    "author": "William Ury",
    "category": "Sales & Persuasion",
    "subcategory": "Persuasion & Influence",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/1283670-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2007,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Saying no is not an act of aggression; it is an act of strategic defense that protects your highest-value assets without burning critical relationships. Master the Yes-No-Yes sandwich to turn defensive refusals into constructive, durable agreements.",
      "coreThesis": "A powerful No is never a destructive reaction to someone else; it is the tactical defense of a deeper, pre-existing affirmative priority delivered with absolute clarity and calm operational respect.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Power of a Positive No: How to Say No and Still Get to Yes"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-power-of-full-engagement",
    "title": "The Power of Full Engagement",
    "author": "Jim Loehr & Tony Schwartz",
    "category": "Productivity",
    "subcategory": "Energy & Burnout",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/472436-M.jpg",
    "readingTimeMinutes": 55,
    "publishedYear": 2003,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop trying to manage your hours and start mastering your energy. True high performance is not a marathon of nonstop grinding, but a rhythm of short, focused sprints backed by deliberate recovery.",
      "coreThesis": "Energy, not time, is the fundamental currency of high performance; sustainable excellence requires balancing rhythmic energy expenditure with disciplined recovery across body, emotions, mind, and spirit.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Power of Full Engagement"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-power-of-habit",
    "title": "The Power of Habit",
    "author": "Charles Duhigg",
    "category": "Productivity",
    "subcategory": "Habits & Routines",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/9078085-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2012,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your daily decisions are not intentional choices\\u2014over forty percent are automated routines running on cognitive autopilot. Master the mechanics of the habit loop, and you seize direct control over human performance, organizational execution, and market behavior.",
      "coreThesis": "Habits run on a three-part mechanical loop\\u2014cue, routine, reward\\u2014and can never be eradicated, only modified by inserting a new routine between the existing cue and craving.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Power of Habit"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-power-of-mindfulness",
    "title": "The Power of Mindfulness",
    "author": "Nyanaponika Thera",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1968,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Mindfulness is not a rigid battle against your thoughts, but an extraordinarily calm, quiet power that transforms the mind simply by seeing things as they are. By practicing bare, non-judgmental attention, you unlock clarity, inner stillness, and freedom from habitual reaction.",
      "coreThesis": "Direct, non-reactive observation\\u2014Bare Attention\\u2014possesses an inherent, quiet strength that untangles mental clutter, disarms compulsive habits, and reveals reality with liberating clarity.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Power of Mindfulness"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-power-of-when",
    "title": "The Power of When",
    "author": "Michael Breus",
    "category": "Productivity",
    "subcategory": "Energy & Burnout",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/12085215-M.jpg",
    "readingTimeMinutes": 80,
    "publishedYear": 2016,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop forcing yourself into someone else's 5 AM routine and unlock the hidden power of your biological clock. When you match your daily actions to your internal biological rhythm, peak performance transforms from an exhausting battle into second nature.",
      "coreThesis": "Peak productivity is not a test of raw willpower; it is an act of biological timing. Aligning what you do with your genetically hardwired chronotype unlocks effortless focus, deeper recovery, and superior daily performance.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Power of When"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-practice-of-vipassana-meditation",
    "title": "The Practice of Vipassana Meditation",
    "author": "Sayadaw U Kundalabhivamsa",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1993,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Transform raw physical discomfort and mental distraction into crystal-clear insight through the gentle, meticulous art of moment-to-moment noting. A masterclass in Theravada Vipassana, this classic guide shows how direct, kind observation uncouples awareness from suffering.",
      "coreThesis": "Suffering dissolves when sensations and thoughts are observed directly with calm, continuous mindfulness rather than resisted through mental aversion or grasped with craving.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Practice of Vipassana Meditation"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-progress-of-insight",
    "title": "The Progress of Insight",
    "author": "Mahasi Sayadaw",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/4986219-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 1965,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "What if your sense of an isolated 'self' is simply an optical illusion created by the high frame-rate of conscious thoughts? Mahasi Sayadaw breaks open the internal machinery of human perception like a master engineer, charting the exact developmental stages of psychological liberation.",
      "coreThesis": "The human ego is not a permanent entity but a continuous cognitive feedback loop, which systematically deconstructs when observed with relentless, high-resolution mindfulness.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Progress of Insight"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-progress-of-insight-through-mental-noting",
    "title": "The Progress of Insight Through Mental Noting",
    "author": "Sayadaw U Sujatha",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1965,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop wrestling with your mind and start labeling what is actually happening. This classic roadmap reveals how simple, steady mental noting dissolves emotional turmoil and leads directly to enduring spiritual freedom.",
      "coreThesis": "Suffering dissolves when you stop identifying with passing thoughts and physical sensations, observing them objectively through continuous, gentle present-moment notation until the mind discovers unconditioned freedom.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Progress of Insight Through Mental Noting"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-promise-of-sleep",
    "title": "The Promise of Sleep",
    "author": "William C. Dement",
    "category": "Health & Longevity",
    "subcategory": "Sleep & Circadian Rhythms",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/239285-M.jpg",
    "readingTimeMinutes": 100,
    "publishedYear": 1999,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Sleep is not a passive timeout from real life; it is an active biological maintenance cycle governed by two opposing internal engines. Mastering these twin engines unlocks peak daytime vitality and safeguards long-term health.",
      "coreThesis": "Your daytime energy and vitality are determined by an exact mathematical balance between your accumulated Sleep Debt and your 24-hour Circadian Clock.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Promise of Sleep"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Finance",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-righteous-mind-why-good-people-are-divided-by-politics-a",
    "title": "The Righteous Mind: Why Good People Are Divided by Politics and Religion",
    "author": "Jonathan Haidt",
    "category": "Psychology",
    "subcategory": "Evolutionary Psychology",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/7256782-M.jpg",
    "readingTimeMinutes": 60,
    "publishedYear": 2012,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Why do decent, reasonable people turn into hostile rivals over politics and faith? Jonathan Haidt reveals that our moral judgments run on automatic gut instincts, while our logic merely works overtime to justify them.",
      "coreThesis": "Intuitions come first, strategic reasoning comes second, and morality binds us into loyal teams while blinding us to alternative viewpoints.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Righteous Mind: Why Good People Are Divided by Politics and Religion"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-road-to-inner-freedom",
    "title": "The Road to Inner Freedom",
    "author": "Nyanaponika Thera",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1982,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop fighting the turbulent current of life and discover the unshakeable stillness of an examined mind. This timeless guide reveals that lasting peace is not a distant belief system, but an immediate, practical art of clear seeing available in every breath.",
      "coreThesis": "Inner freedom is not acquired by escaping the world, but by purifying attention and seeing that the self is an open, flowing process rather than a solid castle to defend.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Road to Inner Freedom"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-roots-of-good-and-evil",
    "title": "The Roots of Good and Evil",
    "author": "Nyanaponika Thera",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1978,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your mind is an ecosystem shaped entirely by six root motives: three poison the soil, while three make it flourish. By learning to identify and uproot greed, aversion, and delusion at their psychological source, you unlock unshakeable clarity and lasting inner freedom.",
      "coreThesis": "All psychological suffering and moral failure originate from greed, hatred, and delusion; genuine liberation arises when clear mindfulness and insight replace these poisons with generosity, loving-kindness, and wisdom.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Roots of Good and Evil"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-scout-mindset",
    "title": "The Scout Mindset",
    "author": "Julia Galef",
    "category": "Psychology",
    "subcategory": "Decision Making",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 75,
    "publishedYear": 2021,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "True strength lies not in defending your fortress, but in mapping the terrain honestly. When you seek reality over victory, you discover unshakeable calm and lasting clarity.",
      "coreThesis": "Wisdom begins when the desire to see reality accurately outweighs the impulse to defend personal pride.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Scout Mindset"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "the-second-mountain-the-quest-for-a-moral-life",
    "title": "The Second Mountain: The Quest for a Moral Life",
    "author": "David Brooks",
    "category": "Personal Growth",
    "subcategory": "Life Transitions & Reinvention",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8782644-M.jpg",
    "readingTimeMinutes": 125,
    "publishedYear": 2019,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "When scaling the mountain of personal ambition leaves you burnt out and empty, an entirely different peak awaits. This book charts how personal breakdown can trigger an identity evolution from self-centered achievement to radical, generative commitment.",
      "coreThesis": "True fulfillment is not achieved by maximizing personal freedom and individual status, but by joyfully surrendering autonomy to four deep commitments: vocation, marriage, philosophy/faith, and community.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Second Mountain: The Quest for a Moral Life"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-selfish-gene",
    "title": "The Selfish Gene",
    "author": "Richard Dawkins",
    "category": "Psychology",
    "subcategory": "Evolutionary Psychology",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/133936-M.jpg",
    "readingTimeMinutes": 65,
    "publishedYear": 1976,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "We are temporary vehicles engineered by immortal code. Strip away sentiment, and nature reveals an eye-opening truth: genes drive life to perpetuate themselves, yet understanding this code gives us the unique power to defy it.",
      "coreThesis": "The fundamental unit of natural selection is not the species or the individual, but the self-copying gene. Living organisms are transient survival vehicles designed to propagate their underlying code.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Selfish Gene"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-seven-sins-of-memory",
    "title": "The Seven Sins of Memory",
    "author": "Daniel L. Schacter",
    "category": "Psychology",
    "subcategory": "Human Behavior",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/392876-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2001,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Our memory is not a broken camcorder; it is a living editing suite that trims clutter so we can make swift decisions. Its seven everyday flaws are actually the hidden price tags of an adaptive, brilliant mind.",
      "coreThesis": "Memory glitches are not biological bugs; they are the natural trade-offs of an efficient, flexible system designed for survival rather than verbatim recording.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Seven Sins of Memory"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-seven-stages-of-purification",
    "title": "The Seven Stages of Purification",
    "author": "Matara Sri Nanarama Mahathera",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1983,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Awakening is not an accidental lightning bolt\\u2014it is a precise, reproducible process of clearing away mental dust step by step. Matara Sri Nanarama provides a direct, master-crafted roadmap detailing how disciplined attention turns everyday confusion into unshakeable spiritual freedom.",
      "coreThesis": "Genuine spiritual liberation is a systematic sequence of mental clarities, where ethical integrity settles the mind, deep stillness unlocks objective seeing, and thorough observation dissolves the illusion of a separate self.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Seven Stages of Purification"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-shallows-what-the-internet-is-doing-to-our-brains",
    "title": "The Shallows: What the Internet Is Doing to Our Brains",
    "author": "Nicholas Carr",
    "category": "Productivity",
    "subcategory": "Focus & Deep Work",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/6458532-M.jpg",
    "readingTimeMinutes": 50,
    "publishedYear": 2010,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your brain is not fixed cement\\u2014it is living soil shaped by every tool you touch. By trading deep books for the relentless stream of digital feeds, we are rewiring our minds for rapid skimming at the expense of sustained contemplation.",
      "coreThesis": "The brain physically adapts to the media tools it uses most: by trading linear reading for rapid online skimming, we sacrifice deep, reflective thinking for fast, fragmented data processing.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Shallows: What the Internet Is Doing to Our Brains"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-shape-of-suffering-a-study-of-dependent-co-arising",
    "title": "The Shape of Suffering: A Study of Dependent Co-arising",
    "author": "Thanissaro Bhikkhu",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2008,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Suffering is not an inescapable fate or a single historical accident; it is an active mechanical loop your mind continuously manufactures right now. By learning where to unplug this causal feedback circuit in real-time, you dismantle stress at its root and step into profound, unconditioned peace.",
      "coreThesis": "Suffering is an active, ongoing process of mental fabrication sustained by real-time feedback loops. By developing calm discernment at key causal junctions in the present moment, you stop feeding the loop and bring stress to an end.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Shape of Suffering: A Study of Dependent Co-arising"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-signal-and-the-noise",
    "title": "The Signal and the Noise",
    "author": "Nate Silver",
    "category": "Psychology",
    "subcategory": "Decision Making",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/7256893-M.jpg",
    "readingTimeMinutes": 65,
    "publishedYear": 2012,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "We generate more data daily than ever, yet our ability to foresee disasters barely improves. Discover the hidden mechanics of probability that separate genuine truth from seductive statistical static.",
      "coreThesis": "The future is inherently probabilistic, not deterministic. Accurate prediction demands filtering out overwhelming noise and constantly updating your beliefs as new evidence arrives.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Signal and the Noise"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "the-skill-of-release",
    "title": "The Skill of Release",
    "author": "Ajahn Lee Dhammadharo",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 60,
    "publishedYear": 1995,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Liberation is not an accident or a vague philosophy\\u2014it is a refined craft mastered breath by breath. Ajahn Lee shows how to train the mind like an artisan, using conscious breath work to ground stillness, untangle suffering, and attain complete unbinding.",
      "coreThesis": "Freedom from suffering is not an abstract concept, but a technical art developed by mastering bodily breath energy and mental stillness until grasping dissolves naturally.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Skill of Release"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-sleep-solution",
    "title": "The Sleep Solution",
    "author": "W. Chris Winter",
    "category": "Health & Longevity",
    "subcategory": "Sleep & Circadian Rhythms",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/11440271-M.jpg",
    "readingTimeMinutes": 85,
    "publishedYear": 2017,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop trying to force sleep like a stubborn car engine\\u2014it is an innate biological reflex, not a high-stakes performance test. Dr. W. Chris Winter reveals the hidden neurological dials of sleep drive and circadian rhythm so you can extinguish nighttime panic and reclaim deep, natural rest.",
      "coreThesis": "Sleep is an involuntary biological drive that cannot be forced, only permitted; fixing sleep requires aligning circadian timing, preserving daytime sleep pressure, and stripping away bed-associated anxiety.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Sleep Solution"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Finance",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-social-animal",
    "title": "The Social Animal",
    "author": "Elliot Aronson",
    "category": "Psychology",
    "subcategory": "Social Psychology",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/3881631-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 1972,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "We imagine ourselves as free-thinking captains of our own minds, but invisible social currents steer our every choice. This book pulls back the curtain on the hidden mental machinery that dictates how we conform, justify our errors, and connect with others.",
      "coreThesis": "People are fundamentally shaped by their social environment, constantly bending reality and inventing justifications to protect their self-worth and belong to the pack.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Social Animal"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-socratic-method-of-psychotherapy",
    "title": "The Socratic Method of Psychotherapy",
    "author": "James Overholser",
    "category": "Creativity & Expression",
    "subcategory": "Logic, Rhetoric & Argument",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 85,
    "publishedYear": 2018,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop lecturing the mind into changing\\u2014learn how to interrogate your own assumptions like an expert scientist inspecting a blueprint. By turning rigid convictions into collaborative questions, this book reveals the precise dialectical engine that restores rational clarity and emotional balance.",
      "coreThesis": "Genuine psychological change occurs not by receiving outside advice, but through systematic, collaborative questioning that exposes faulty assumptions and cultivates character virtues from within.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Socratic Method of Psychotherapy"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-soulful-art-of-persuasion",
    "title": "The Soulful Art of Persuasion",
    "author": "Jason Harris",
    "category": "Sales & Persuasion",
    "subcategory": "Persuasion & Influence",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8780390-M.jpg",
    "readingTimeMinutes": 55,
    "publishedYear": 2019,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Mastery over influence is not an arm-wrestling contest of slick tricks, but a magnetic gravitational field cultivated through character. By practicing eleven daily habits across four human principles, you transform persuasion from an aggressive sales pitch into an authentic, compounding relationship.",
      "coreThesis": "Durable persuasion is an organic byproduct of personal character, not transactional technique; true influence attracts willing alignment by compounding authenticity, generosity, empathy, and integrity.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Soulful Art of Persuasion"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-sound-of-silence-selected-teachings",
    "title": "The Sound of Silence: Selected Teachings",
    "author": "Ajahn Sumedho",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 135,
    "publishedYear": 2007,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "You do not need to silence your noisy thoughts to find peace; you only need to tune your ear to the spacious, quiet awareness in which those thoughts already come and go. Through the simple practice of listening to the subtle inner 'sound of silence,' Ajahn Sumedho reveals that liberation is not an exotic future achievement, but your immediate, uncluttered natural state.",
      "coreThesis": "Suffering stems from identifying with passing thoughts and demanding that life conform to personal desires; true liberation is realized the moment you take refuge in the silent, spacious awareness that effortlessly witnesses all change.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Sound of Silence: Selected Teachings"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-state-of-mind-called-beautiful",
    "title": "The State of Mind Called Beautiful",
    "author": "Sayadaw U Pandita",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2006,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Step out of the storm of mental reactivity into pristine clarity. Revered meditation master Sayadaw U Pandita provides a rigorous, practical blueprint for training your mind until calm awareness becomes your natural home.",
      "coreThesis": "Genuine inner peace is cultivated through ethical discipline, protective goodwill, and razor-sharp moment-to-moment awareness that cuts cleanly through conditioned reactivity.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The State of Mind Called Beautiful"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-sutta-discovery-early-buddhist-teachings",
    "title": "The Sutta Discovery: Early Buddhist Teachings",
    "author": "Piya Tan & Bhikkhu Analayo",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 65,
    "publishedYear": 2003,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Strip away millennia of cultural rituals and meet the historical Buddha as an incisive behavioral systems analyst. This work dismantles the machinery of everyday stress using early textual forensics, revealing a repeatable protocol for cognitive freedom.",
      "coreThesis": "Psychological distress is an automated feedback loop triggered when consciousness misidentifies changing, uncontrollable events as a permanent self; dismantling this mistaken assumption through systematic observation permanently switches off reactive suffering.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Sutta Discovery: Early Buddhist Teachings"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-suttanipata-an-ancient-collection-of-discourses",
    "title": "The Suttanipata: An Ancient Collection of Discourses",
    "author": "Bhikkhu Bodhi",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2017,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Step into the oldest, most intimate verses of the Buddha before religious dogma took root. Here is a stripped-down, practical handbook for shedding anxiety, ending petty arguments, and discovering unconditional peace right where you stand.",
      "coreThesis": "True freedom is not found in defending beliefs or accumulating possessions, but in loosening your mental grip, shedding ideological disputes, and dwelling in peaceful, unattached awareness.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Suttanipata: An Ancient Collection of Discourses"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-systems-view-of-life",
    "title": "The Systems View of Life",
    "author": "Fritjof Capra & Pier Luigi Luisi",
    "category": "Psychology",
    "subcategory": "Human Behavior",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/7785208-M.jpg",
    "readingTimeMinutes": 90,
    "publishedYear": 2014,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Step behind the curtain of everyday reality to discover life not as a machine, but as an interconnected, self-generating web. Once you see the hidden feedback loops connecting biology, mind, and society, the entire world reveals its hidden operating system.",
      "coreThesis": "Life is a self-generating, interconnected network of relationships where cognition, biology, and society form an inseparable whole that cannot be understood through isolated parts.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Systems View of Life"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "the-upward-spiral",
    "title": "The Upward Spiral",
    "author": "Alex Korb",
    "category": "Psychology",
    "subcategory": "Mental Health & Healing",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10231295-M.jpg",
    "readingTimeMinutes": 60,
    "publishedYear": 2015,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Depression is not a broken engine; it is a complex mechanical system caught in a self-reinforcing downward spin. By executing deliberate, tiny physical and cognitive adjustments, you can reverse the gears and trigger an unstoppable upward spiral.",
      "coreThesis": "Depression is a feedback loop driven by the natural wiring of interconnected brain circuits; any tiny positive change in action, environment, or thought mechanically shifts neural chemistry and reverses the spiral.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Upward Spiral"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-uses-of-argument",
    "title": "The Uses of Argument",
    "author": "Stephen E. Toulmin",
    "category": "Creativity & Expression",
    "subcategory": "Logic, Rhetoric & Argument",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/3087074-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 1958,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Human reasoning is not a rigid mathematical equation; it is a practical trial in the courtroom of daily life. When you inspect an argument like an engineer inspecting a bridge, you reveal the precise joints and stress points that decide whether an idea stands or collapses.",
      "coreThesis": "Sound arguments are practical structures built to withstand scrutiny in specific real-world contexts, not timeless mathematical deductions.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Uses of Argument"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-war-of-art",
    "title": "The War of Art",
    "author": "Steven Pressfield",
    "category": "Productivity",
    "subcategory": "Beating Procrastination",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/288439-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2002,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Procrastination is not a moral failing or lack of willpower; it is an active, invisible friction called Resistance that attacks the moment you attempt meaningful work. The only antidote is shedding the amateur mindset and turning pro: showing up to your workspace every single day regardless of weather, mood, or motivation.",
      "coreThesis": "Resistance is an active, universal force that opposes every positive transformation; victory comes not from waiting for inspiration, but from adopting the daily, unglamorous discipline of a professional who shows up and executes rain or shine.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The War of Art"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-way-to-the-guru-meditative-guidance",
    "title": "The Way to the Guru: Meditative Guidance",
    "author": "Sayadaw U Pandita",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 50,
    "publishedYear": 1992,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Cut through spiritual romanticism with surgical mindfulness. This rigorous guide demonstrates how direct, microscopic attention to your immediate sensory reality dissolves mental friction and delivers lasting inner liberation.",
      "coreThesis": "Enlightenment is not a distant, esoteric trance; it is the natural consequence of unbroken, precise awareness brought to this very moment.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Way to the Guru: Meditative Guidance"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-willpower-instinct",
    "title": "The Willpower Instinct",
    "author": "Kelly McGonigal",
    "category": "Productivity",
    "subcategory": "Goal Setting & Execution",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/9475786-M.jpg",
    "readingTimeMinutes": 50,
    "publishedYear": 2011,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Willpower is not a moral character trait\\u2014it is a biological battery and a strategic asset you must manage like scarce capital. Master your physiology, align your incentives, and build pre-commitments so temptation never enters the arena.",
      "coreThesis": "Willpower is a depletable biological operating system governed by physiology and incentives; long-term execution succeeds by engineering external pre-commitments rather than relying on raw restraint.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Willpower Instinct"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-wings-to-awakening-an-anthology-from-the-pali-canon",
    "title": "The Wings to Awakening: An Anthology from the Pali Canon",
    "author": "Thanissaro Bhikkhu",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 90,
    "publishedYear": 1996,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Awakening is not mystical luck or vague surrender; it is a practical, master craft anyone can develop through disciplined attention. This anthology reveals the Buddha's definitive engineering manual for purifying attention and experiencing unshakable freedom right now.",
      "coreThesis": "Suffering is an active process generated by unexamined intentions, and liberation is a practical, trainable craft achieved by aligning attention, stillness, and clear discernment with immediate reality.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Wings to Awakening: An Anthology from the Pali Canon"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-worn-out-skin-reflections-on-the-uraga-sutta",
    "title": "The Worn-Out Skin: Reflections on the Uraga Sutta",
    "author": "Nyanaponika Thera",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1977,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Just as a serpent steps out of a dried-up skin without looking back, the awakened mind naturally discards resentment, craving, and rigid self-images. Nyanaponika Thera transforms an ancient seventeen-verse Buddhist chant into an urgent, practical guide for shedding emotional baggage and living in unburdened awareness.",
      "coreThesis": "Genuine inner freedom occurs naturally when awareness clearly sees that anger, craving, and fixed self-images are restrictive dead husks, allowing the mind to shed them cleanly without regret or identity.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Worn-Out Skin: Reflections on the Uraga Sutta"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "the-worry-trick",
    "title": "The Worry Trick",
    "author": "David A. Carbonell",
    "category": "Psychology",
    "subcategory": "Anxiety & Stress Relief",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 70,
    "publishedYear": 2016,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Chronic anxiety is not an intellectual crisis; it is a brain glitch running an ultra-sensitive home smoke alarm that blares at harmless burnt toast. When you discover how worry tricks you into treating phantom doubts as real fires, you can stop throwing emotional gasoline on the flames and disarm the feedback loop forever.",
      "coreThesis": "Worry tricks you by disguising everyday uncertainty as imminent danger, but treating that illusion like a genuine emergency is the precise fuel that keeps it alive.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "The Worry Trick"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "think-again-the-power-of-knowing-what-you-don-t-know",
    "title": "Think Again: The Power of Knowing What You Don't Know",
    "author": "Adam Grant",
    "category": "Creativity & Expression",
    "subcategory": "Logic, Rhetoric & Argument",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10470266-M.jpg",
    "readingTimeMinutes": 55,
    "publishedYear": 2021,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "In a volatile world, intelligence is not about how fast you think\\u2014it is about how quickly you can unlearn obsolete assumptions. Strategic advantage belongs to leaders who treat their convictions like hypotheses waiting to be tested, not fortresses to defend.",
      "coreThesis": "Progress depends on unlearning and updating your assumptions faster than the operating environment changes. Treating beliefs as provisional hypotheses\\u2014rather than core identities\\u2014is the ultimate cognitive moat against obsolescence.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Think Again: The Power of Knowing What You Don't Know"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "thinking-fast-and-slow",
    "title": "Thinking, Fast and Slow",
    "author": "Daniel Kahneman",
    "category": "Sales & Persuasion",
    "subcategory": "Buyer Psychology",
    "coverColor": "from-emerald-600 to-teal-900",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/13290711-M.jpg",
    "readingTimeMinutes": 190,
    "publishedYear": 2011,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your brain runs on two distinct engines that shape every choice you make. Peek behind the curtain to see how hidden mental reflexes secretly guide your daily decisions.",
      "coreThesis": "Human judgment is guided by fast automatic heuristics that generate efficient everyday choices while producing systematic cognitive blind spots.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Thinking, Fast and Slow"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "thinking-in-bets",
    "title": "Thinking in Bets",
    "author": "Annie Duke",
    "category": "Psychology",
    "subcategory": "Decision Making",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8792782-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2018,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Life is not a game of chess with visible pieces; it is a foggy landscape governed by hidden variables and luck. Mastering the art of probabilistic bets transforms blind anxiety into clear, scientific judgment.",
      "coreThesis": "Quality decisions do not guarantee winning outcomes because life contains hidden information and uncontrollable luck. Evaluating choices as probabilistic bets protects against cognitive biases and builds resilient judgment.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Thinking in Bets"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "thinking-in-systems-a-primer",
    "title": "Thinking in Systems: A Primer",
    "author": "Donella H. Meadows",
    "category": "Psychology",
    "subcategory": "Human Behavior",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/14420637-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2008,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Beneath everyday chaos lies a quiet web of unseen feedback loops guiding modern life. Master these secret mechanics to see how small tweaks unlock massive change.",
      "coreThesis": "System behavior is driven by internal structure rather than external shocks. Shift the underlying information flows and rules to effortlessly reshape outcomes.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Thinking in Systems: A Primer"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "this-naked-mind",
    "title": "This Naked Mind",
    "author": "Annie Grace",
    "category": "Productivity",
    "subcategory": "Beating Procrastination",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/14810515-M.jpg",
    "readingTimeMinutes": 120,
    "publishedYear": 2015,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Quitting alcohol does not require lifelong white-knuckle willpower; it requires systematically exposing the subconscious illusions that make you desire it in the first place. When you align your unconscious beliefs with biological reality, the urge to drink simply evaporates.",
      "coreThesis": "Alcohol dependency is an engineered conflict between conscious logic and conditioned subconscious desire; dismantle the false beliefs that alcohol delivers genuine pleasure or stress relief, and the craving disappears without willpower.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "This Naked Mind"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "time-smart-how-to-reclaim-your-time-and-live-a-happier-life",
    "title": "Time Smart: How to Reclaim Your Time and Live a Happier Life",
    "author": "Ashley Whillans",
    "category": "Productivity",
    "subcategory": "Daily Systems & Workflows",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2020,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop trading your precious lifespan for pennies of convenience. Ashley Whillans delivers an actionable behavioral playbook to shift from chronic time poverty to time affluence, proving that reclaiming your hours generates far greater happiness and performance than chasing incremental dollars.",
      "coreThesis": "Time is an irreplaceable, non-renewable asset that yields exponentially higher happiness and well-being than incremental wealth; winning back your life requires deliberately buying, protecting, and spending time on high-value human experiences.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Time Smart: How to Reclaim Your Time and Live a Happier Life"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "timeless-wisdom-in-depth-dhamma-talks",
    "title": "Timeless Wisdom: In-Depth Dhamma Talks",
    "author": "Sayadaw U Pandita",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 120,
    "publishedYear": 2010,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Liberation is not an abstract philosophy; it is an uncompromising craft of direct, real-time attention. Sayadaw U Pandita provides a clinical, compassionate masterclass in dismantling suffering by observing reality exactly as it rises and falls.",
      "coreThesis": "Suffering dissolves when unbroken, moment-to-moment awareness intercepts raw experience at the senses before mental habits twist it into craving and conflict.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Timeless Wisdom: In-Depth Dhamma Talks"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "tiny-habits-the-small-changes-that-change-everything",
    "title": "Tiny Habits: The Small Changes That Change Everything",
    "author": "BJ Fogg",
    "category": "Productivity",
    "subcategory": "Habits & Routines",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/9261174-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2019,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop beating yourself up for lacking willpower. Real, lasting transformation happens when you make behaviors so tiny they require zero effort and anchor them to routines you already do every single day.",
      "coreThesis": "Behavior happens when Motivation, Ability, and a Prompt collide at once; by shrinking any desired action into a tiny step and anchoring it to an existing routine, change becomes effortless and permanent.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Tiny Habits: The Small Changes That Change Everything"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "to-sell-is-human-the-surprising-truth-about-moving-others",
    "title": "To Sell Is Human: The Surprising Truth About Moving Others",
    "author": "Daniel H. Pink",
    "category": "Sales & Persuasion",
    "subcategory": "Persuasion & Influence",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10297418-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2012,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Whether you are a physician advising a patient, an engineer pitching an architecture change, or a parent organizing a family schedule, you spend your days selling. Persuasion is no longer a slimy transaction\\u2014it is the universal human craft of moving others to action.",
      "coreThesis": "Sales has transformed from transactional manipulation into the universal human art of moving others through empathy, resilience, and clarity of purpose.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "To Sell Is Human: The Surprising Truth About Moving Others"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "to-the-last-breath-dhamma-talks-on-illness-and-death",
    "title": "To the Last Breath: Dhamma Talks on Illness and Death",
    "author": "Ajahn Maha Bua",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1992,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "When severe pain or mortal illness strikes, your mind does not have to collapse with the body. Ajahn Maha Bua offers a fearless, practical roadmap to dissect physical suffering and discover the unshakeable awareness that never dies.",
      "coreThesis": "The body experiences pain and inevitably perishes, but the pure knowing awareness observing it does not die. Liberation comes from dissecting sensation from mind and letting go of all clinging.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "To the Last Breath: Dhamma Talks on Illness and Death"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "transcendental-dependent-arising",
    "title": "Transcendental Dependent Arising",
    "author": "Bhikkhu Bodhi",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1980,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Suffering is not a permanent trap, but the exact compost out of which your spiritual awakening naturally blooms. Discover the Buddha's hidden upward spiral of cause and effect that transforms everyday friction into unshakable freedom.",
      "coreThesis": "Awakening is not an accidental event or an act of force, but a lawful, natural chain reaction where meeting life's inevitable friction with clear awareness naturally unfolds into joy, stillness, and liberation.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Transcendental Dependent Arising"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "transitions-making-sense-of-life-s-changes",
    "title": "Transitions: Making Sense of Life's Changes",
    "author": "William Bridges",
    "category": "Personal Growth",
    "subcategory": "Life Transitions & Reinvention",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/135169-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 1980,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Change is just an external event like a new job or house, but transition is the profound internal rewire that makes it work. To truly start anything new in life, you must first master the art of ending well.",
      "coreThesis": "Situational change is an external event that happens instantly, but personal transition is an organic, three-stage internal transformation that begins only when you fully mourn and dismantle what has ended.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Transitions: Making Sense of Life's Changes"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "treatise-on-the-vipassana-insight-practice",
    "title": "Treatise on the Vipassana Insight Practice",
    "author": "Mahasi Sayadaw",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1950,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop fighting your thoughts and start tracking reality with laboratory precision. This masterwork is the definitive field guide to peeling away mental delusion and awakening directly to the unshakeable peace hidden within ordinary, present awareness.",
      "coreThesis": "Suffering is sustained only by clinging to an imagined, unchanging ego; by impartially noting the birth and death of each present sensation and thought, consciousness naturally unties its own knots and tastes liberation.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Treatise on the Vipassana Insight Practice"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "tug-of-vow-monastic-training-in-the-forest-tradition",
    "title": "Tug of Vow: Monastic Training in the Forest Tradition",
    "author": "Ajahn Amaro",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2011,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Vows are not cages built to trap your vitality; they are riverbanks designed to turn chaotic mental rapids into a clean, focused current of liberation. Master forest monk Ajahn Amaro reveals how submitting to radical simplicity and deliberate discipline unlocks an unshakeable, spacious freedom right in the middle of daily life.",
      "coreThesis": "Authentic freedom is never found by expanding our options to satisfy every passing craving, but by establishing firm boundaries that extinguish the illusion of the self-centered ego.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Tug of Vow: Monastic Training in the Forest Tradition"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "turning-the-wheel-of-truth",
    "title": "Turning the Wheel of Truth",
    "author": "Ajahn Sucitto",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 90,
    "publishedYear": 2010,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Ajahn Sucitto takes the Buddha's inaugural teaching\\u2014the foundation of all Buddhist wisdom\\u2014and turns it into a clear, living field manual for navigating modern human stress and discovering unshakeable inner peace.",
      "coreThesis": "Suffering is not caused by the natural turbulence of life, but by the mind's automatic reflex to clutch and resist; freedom arrives the exact instant we open our hands and step out of the grip of craving.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Turning the Wheel of Truth"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "ultralearning",
    "title": "Ultralearning",
    "author": "Scott H. Young",
    "category": "Productivity",
    "subcategory": "Speed Reading & Learning",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10156205-M.jpg",
    "readingTimeMinutes": 70,
    "publishedYear": 2019,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Traditional education moves like a glacier, but modern careers demand supersonic adaptation. Ultralearning hands you the playbook to master hard skills fast, shatter career plateaus, and build unstoppable personal momentum.",
      "coreThesis": "Deep expertise is not a gift for the privileged few; it is a repeatable protocol powered by direct practice, aggressive recall, and relentless feedback.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Ultralearning"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "unexpected-freedom-dhamma-reflections",
    "title": "Unexpected Freedom: Dhamma Reflections",
    "author": "Ajahn Munindo",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 80,
    "publishedYear": 2005,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Freedom is not a far-off trophy won through spiritual struggle; it is the unexpected, quiet discovery of peace waiting whenever you stop fighting your own experience.",
      "coreThesis": "Genuine freedom is not achieved by perfecting your circumstances or suppressing difficult emotions, but by resting as the spacious, compassionate awareness that welcomes all of life without clinging or aversion.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Unexpected Freedom: Dhamma Reflections"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "unlearn-your-pain",
    "title": "Unlearn Your Pain",
    "author": "Howard Schubiner & Michael Betzold",
    "category": "Health & Longevity",
    "subcategory": "Longevity & Vitality",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/11435795-M.jpg",
    "readingTimeMinutes": 60,
    "publishedYear": 2010,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your chronic pain is genuine, but your body isn't broken\\u2014your brain's danger alarm is simply stuck on high. By understanding the neuroscience of Mind Body Syndrome, you can retrain your neural pathways and turn off the false alarm for good.",
      "coreThesis": "Chronic pain is often a learned neuroplastic alarm created by an overprotective brain rather than damaged physical tissue; when you replace fear with evidence of safety, the brain unlearns the pain.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Unlearn Your Pain"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Finance",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "untamed",
    "title": "Untamed",
    "author": "Glennon Doyle",
    "category": "Personal Growth",
    "subcategory": "Authenticity & Self-Worth",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/9295686-M.jpg",
    "readingTimeMinutes": 265,
    "publishedYear": 2020,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Untamed reveals how human beings are systematically domesticated by cultural expectations, trading their authentic wild instincts for social approval. Glennon Doyle delivers an invigorating field guide to dismantling those invisible cages and trusting your own internal compass.",
      "coreThesis": "Human fulfillment requires unlearning cultural domestication, tuning out the noise of external consensus, and anchoring every life decision in your own quiet internal knowing.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Untamed"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "unwinding-anxiety",
    "title": "Unwinding Anxiety",
    "author": "Judson Brewer",
    "category": "Psychology",
    "subcategory": "Anxiety & Stress Relief",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10721914-M.jpg",
    "readingTimeMinutes": 65,
    "publishedYear": 2021,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Anxiety is not an incurable character flaw\\u2014it is a learned habit loop driven by your brain's survival machinery. By trading exhausting willpower for curious awareness, you can recalibrate your brain's internal reward pricing and dissolve worry at its root.",
      "coreThesis": "Anxiety persists because the brain mistakes worrying for a protective habit; true relief comes not from fighting the feeling with willpower, but from clearly seeing its true physical cost and offering the nervous system the superior reward of curious awareness.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Unwinding Anxiety"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "venerable-acariya-mun-bhuridatta-spiritual-biography",
    "title": "Venerable Acariya Mun Bhuridatta: Spiritual Biography",
    "author": "Ajahn Maha Bua",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2002,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Step into the deep wilderness with Thailand's greatest modern forest master to discover how stripping away comfort reveals unshakable inner freedom. This extraordinary spiritual biography proves that complete enlightenment is not an ancient myth, but a living, practical reality achievable right here and now.",
      "coreThesis": "Total liberation from suffering is achieved not by escaping the world, but by turning awareness directly upon the mind to burn away all self-deception through unwavering mindfulness and courageous self-investigation.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Venerable Acariya Mun Bhuridatta: Spiritual Biography"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "vipassana-meditation-guidelines",
    "title": "Vipassana Meditation Guidelines",
    "author": "Chanmyay Sayadaw (U Janakabhivamsa)",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1983,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop fighting your wandering mind and learn to observe reality exactly as it unfolds right now. Chanmyay Sayadaw offers a direct, no-nonsense roadmap to Vipassana insight using continuous, everyday mindfulness.",
      "coreThesis": "Suffering dissolves when you silently and non-reactively label every physical sensation and mental state the exact instant it arises.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Vipassana Meditation Guidelines"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "vipassana-meditation-lectures-on-insight",
    "title": "Vipassana Meditation: Lectures on Insight",
    "author": "Chanmyay Sayadaw (U Janakabhivamsa)",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1997,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Step out of the storm of chronic overthinking and awaken to reality as it actually unfolds in your immediate physical and mental experience. Venerable Chanmyay Sayadaw delivers a masterclass in classic Burmese insight meditation, turning moment-to-moment awareness into a direct scalpel for emotional freedom.",
      "coreThesis": "Suffering ceases not by suppressing thoughts or escaping the world, but by observing the body and mind in real time with continuous, label-assisted, non-judgmental awareness until the illusion of a separate self dissolves naturally.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Vipassana Meditation: Lectures on Insight"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "vipassana-talks-from-mahasi-sasana-yeiktha",
    "title": "Vipassana Talks from Mahasi Sasana Yeiktha",
    "author": "Sayadaw U Lakkhana",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2004,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Vipassana Talks from Mahasi Sasana Yeiktha reveals meditation not as a mystical retreat from life, but as an exact, moment-to-moment training in seeing reality without egoic distortion. Through the classic Mahasi noting method, Sayadaw U Lakkhana delivers an unadorned owner's manual for dismantling anxiety, reactive habits, and existential suffering.",
      "coreThesis": "Suffering dissolves when awareness meets each immediate sensation, thought, and emotion with precise, non-reactive noting, revealing reality as an impermanent, ungraspable process free of a permanent self.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Vipassana Talks from Mahasi Sasana Yeiktha"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "volition-the-real-mastermind-behind-kamma",
    "title": "Volition: The Real Mastermind Behind Kamma",
    "author": "Sayadaw U Silananda",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1990,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Kamma is neither cosmic punishment nor unalterable destiny; it is the natural harvest of your own psychological intent. By mastering volition in this immediate breath, you stop being a helpless victim of your past and become the deliberate architect of your inner freedom.",
      "coreThesis": "Action is defined by the mental intention behind it, meaning your current state of awareness\\u2014not cosmic destiny\\u2014is the true author of your reality and your freedom.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Volition: The Real Mastermind Behind Kamma"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "we-need-to-talk-how-to-have-conversations-that-matter",
    "title": "We Need to Talk: How to Have Conversations That Matter",
    "author": "Celeste Headlee",
    "category": "Communication",
    "subcategory": "Difficult Conversations",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8814780-M.jpg",
    "readingTimeMinutes": 80,
    "publishedYear": 2017,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "We talk constantly through glass screens and polished monologues, yet we have forgotten the biological craft of actually speaking to one another. Celeste Headlee reveals the scientific feedback loops of human dialogue and gives us the practical tools to turn friction into genuine connection.",
      "coreThesis": "Meaningful conversation is not a performance of intelligence or persuasive debate, but an active discipline of curiosity and deep listening that requires setting aside ego to discover the other person's reality.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "We Need to Talk: How to Have Conversations That Matter"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "when-awareness-becomes-natural",
    "title": "When Awareness Becomes Natural",
    "author": "Sayadaw U Tejaniya",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2016,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Meditation is not an escape from reality\\u2014it is learning to watch reality unfold without tension or interference. Sayadaw U Tejaniya reveals how gentle, uninterrupted awareness turns everyday routines into direct liberation.",
      "coreThesis": "Mindfulness is not about forcing the mind into artificial stillness; it is the effortless, continuous recognition of mental states with a relaxed attitude of non-judgmental wisdom.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "When Awareness Becomes Natural"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "when-i-say-no-i-feel-guilty",
    "title": "When I Say No, I Feel Guilty",
    "author": "Manuel J. Smith",
    "category": "Communication",
    "subcategory": "Boundaries & Assertiveness",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/7392805-M.jpg",
    "readingTimeMinutes": 55,
    "publishedYear": 1975,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Human conflict operates on predictable psychological feedback loops where guilt and anxiety are engineered to make you surrender your autonomy. Manuel J. Smith reveals the exact verbal scripts and behavioral mechanics needed to absorb criticism calmly, state boundaries effortlessly, and say no without an ounce of remorse.",
      "coreThesis": "You possess the absolute, inalienable right to be the ultimate judge of your own behavior, choices, and emotions; guilt arises only when you mistakenly surrender that judgment to someone else.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "When I Say No, I Feel Guilty"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "when-panic-attacks",
    "title": "When Panic Attacks",
    "author": "David D. Burns",
    "category": "Psychology",
    "subcategory": "Anxiety & Stress Relief",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/528563-M.jpg",
    "readingTimeMinutes": 120,
    "publishedYear": 2006,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Panic and chronic anxiety are not incurable neurochemical defects, but miswired smoke alarms triggered by cognitive distortions and suppressed feelings. Master an engineering toolkit of 40 drug-free techniques that rewire your physiological threat response on demand.",
      "coreThesis": "Anxiety is not caused by external circumstances or biological deficits, but by distorted internal interpretations and unexpressed emotions that hijack the nervous system; dismantling these faulty cognitive scripts and confronting sensations directly permanently resets the alarm.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "When Panic Attacks"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "when-the-scientific-secrets-of-perfect-timing",
    "title": "When: The Scientific Secrets of Perfect Timing",
    "author": "Daniel H. Pink",
    "category": "Productivity",
    "subcategory": "Energy & Burnout",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8552540-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2018,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Timing is not an intuitive art or lucky guess; it is an exact science that determines whether your efforts fly or flop. Learn when your brain is primed for analytical execution, creative insight, or restful recovery, and take control of your day.",
      "coreThesis": "Timing is an evidence-based science of biological rhythms and psychological phases; scheduling the right task for the right temporal window dramatically outperforms raw willpower.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "When: The Scientific Secrets of Perfect Timing"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "where-to-draw-the-line-how-to-set-healthy-boundaries-every-d",
    "title": "Where to Draw the Line: How to Set Healthy Boundaries Every Day",
    "author": "Anne Katherine",
    "category": "Communication",
    "subcategory": "Boundaries & Assertiveness",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/428607-M.jpg",
    "readingTimeMinutes": 140,
    "publishedYear": 2000,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Healthy boundaries are not hostile concrete walls that isolate you\\u2014they are precision cellular membranes that let warmth in while keeping toxins out. Anne Katherine reveals the exact interpersonal mechanics required to hold your perimeter without guilt, aggression, or collapse.",
      "coreThesis": "A healthy boundary is an act of clarity rather than combat; it defines your psychological territory with semi-permeable precision so that connection flourishes and violation becomes impossible.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Where to Draw the Line: How to Set Healthy Boundaries Every Day"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "who-gets-what-and-why",
    "title": "Who Gets What \\u2014 and Why",
    "author": "Alvin E. Roth",
    "category": "Productivity",
    "subcategory": "Goal Setting & Execution",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 60,
    "publishedYear": 2015,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Money alone cannot buy you admission to college, a chosen job, or a compatible kidney donor\\u2014both sides must choose each other. Nobel laureate Alvin Roth decodes the invisible architecture of matching markets and shows how intelligent rules prevent chaos, unraveling, and unfairness in everyday life.",
      "coreThesis": "Markets fail not because people are irrational, but because poorly structured matching rules force them into self-protective gaming; stability emerges only when marketplaces are engineered to be thick, unhurried, and safe for honest preference-sharing.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Who Gets What \\u2014 and Why"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "who-moved-my-cheese",
    "title": "Who Moved My Cheese?",
    "author": "Spencer Johnson",
    "category": "Personal Growth",
    "subcategory": "Life Transitions & Reinvention",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/258839-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 1998,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Change isn't an ambush; it's an ecological rhythm. Learn how shedding yesterday's habits unlocks tomorrow's possibilities before comfort turns into stagnation.",
      "coreThesis": "Change is inevitable and relentless; your success depends not on preserving old comfort, but on noticing shifts early and moving swiftly into uncharted terrain.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Who Moved My Cheese?"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "why-we-get-sick",
    "title": "Why We Get Sick",
    "author": "Benjamin Bikman",
    "category": "Health & Longevity",
    "subcategory": "Nutrition & Metabolism",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10394551-M.jpg",
    "readingTimeMinutes": 75,
    "publishedYear": 2020,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Most chronic modern diseases are not isolated malfunctions\\u2014they are symptoms of a single underlying metabolic logjam called insulin resistance. By fixing cellular energy dynamics rather than just chasing blood glucose numbers, you can prevent and reverse widespread degenerative illness.",
      "coreThesis": "Insulin resistance driven by chronic hyperinsulinemia is the silent root cause of most modern chronic diseases, and reversing it requires restoring cellular insulin sensitivity through strategic nutrition and muscle activation.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Why We Get Sick"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Finance",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "why-we-sleep-unlocking-the-power-of-sleep-and-dreams",
    "title": "Why We Sleep: Unlocking the Power of Sleep and Dreams",
    "author": "Matthew Walker",
    "category": "Health & Longevity",
    "subcategory": "Sleep & Circadian Rhythms",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8814155-M.jpg",
    "readingTimeMinutes": 80,
    "publishedYear": 2017,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Sleep is not a passive luxury\\u2014it is the ultimate biological moat that resets your brain's processing speed and fortifies your physical defense system every single night. Deprive yourself of it, and you run a high-stakes deficit that compounding interest will brutally liquidate.",
      "coreThesis": "Sleep is a non-negotiable biological maintenance cycle that dictates every facet of mental acuity, physical longevity, and emotional resilience. Sacrificing sleep for productivity is an asymmetric gamble that guarantees degraded execution and accelerated systemic failure.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Why We Sleep: Unlocking the Power of Sleep and Dreams"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Finance",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "willpower-doesn-t-work",
    "title": "Willpower Doesn't Work",
    "author": "Benjamin Hardy",
    "category": "Productivity",
    "subcategory": "Goal Setting & Execution",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/8804289-M.jpg",
    "readingTimeMinutes": 70,
    "publishedYear": 2018,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop fighting your biology with exhausting mental strain. Re-engineer your surrounding architecture with hard forcing functions so success becomes the path of least resistance.",
      "coreThesis": "Willpower is a finite, unreliable fuel; enduring behavioral transformation occurs only when you deliberately design an external environment that automates your goals and eliminates failure options.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Willpower Doesn't Work"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "wim-hof-the-wim-hof-method",
    "title": "Wim Hof: The Wim Hof Method",
    "author": "Wim Hof",
    "category": "Health & Longevity",
    "subcategory": "Breathwork & Somatics",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10389858-M.jpg",
    "readingTimeMinutes": 65,
    "publishedYear": 2020,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your autonomic nervous system isn't a locked control room\\u2014it is an responsive engine you can consciously steer through cyclic breathwork, hormetic cold immersion, and disciplined focus. By stepping outside modern climate-controlled comfort, you can recalibrate your vascular tone, quiet chronic inflammation, and reclaim natural biological vitality.",
      "coreThesis": "The human autonomic nervous system and immune response can be consciously influenced through controlled hyperventilation, purposeful breath retention, and gradual thermal cold stress.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Wim Hof: The Wim Hof Method"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Finance",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "win-every-argument-the-art-of-debating-persuading-and-public",
    "title": "Win Every Argument: The Art of Debating, Persuading, and Public Speaking",
    "author": "Mehdi Hasan",
    "category": "Creativity & Expression",
    "subcategory": "Logic, Rhetoric & Argument",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/12688074-M.jpg",
    "readingTimeMinutes": 80,
    "publishedYear": 2023,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Argumentation is not an academic lecture; it is a live psychological contest where human attention, trust, and emotional alignment dictate reality. Master the forensic tools of high-stakes dialectic to dismantle bad-faith rhetoric and sway the only people who actually matter: the audience.",
      "coreThesis": "Victory in any debate does not come from bludgeoning an opponent with cold data, but from capturing the hearts and minds of the watching audience through emotional resonance, ironclad evidence, and defensive mastery.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Win Every Argument: The Art of Debating, Persuading, and Public Speaking"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "wisdom-develops-samadhi",
    "title": "Wisdom Develops Samadhi",
    "author": "Ajahn Maha Bua",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 1983,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop forcing a turbulent mind to freeze into silence; learn how sharp, clear investigation naturally dissolves restlessness and ushers in unshakable inner peace.",
      "coreThesis": "Stillness does not always precede insight; actively applying investigative wisdom dissolves mental turbulence and naturally leads the mind into profound, unwavering absorption.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Wisdom Develops Samadhi"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "with-each-and-every-breath-a-guide-to-meditation",
    "title": "With Each and Every Breath: A Guide to Meditation",
    "author": "Thanissaro Bhikkhu",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2013,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your breath is not just air entering your lungs\\u2014it is an internal energy network and a direct steering wheel for your attention. Thanissaro Bhikkhu delivers a rigorous, master-craftsman guide from the Thai Forest tradition to turn every breath into an anchor of clear awareness, profound comfort, and lasting freedom.",
      "coreThesis": "Genuine, reliable happiness is an internal craft cultivated by training the mind to harmonize with the breath, replacing compulsive reactive habits with luminous awareness and discernment.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "With Each and Every Breath: A Guide to Meditation"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "with-good-reason-an-introduction-to-informal-fallacies",
    "title": "With Good Reason: An Introduction to Informal Fallacies",
    "author": "S. Morris Engel",
    "category": "Creativity & Expression",
    "subcategory": "Logic, Rhetoric & Argument",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/4010429-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 1976,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Human communication is full of persuasive traps that look like sound logic but collapse under inspection. S. Morris Engel provides an X-ray scanner for everyday arguments, showing you how to spot linguistic sleights of hand and evaluate claims with surgical clarity.",
      "coreThesis": "An argument is only as dependable as its unstated assumptions and the precision of its language; strip away emotional decoys, and flawed claims collapse under their own structural weight.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "With Good Reason: An Introduction to Informal Fallacies"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "without-and-within-questions-and-answers-on-theravada-buddhism",
    "title": "Without and Within: Questions and Answers on Theravada Buddhism",
    "author": "Ajahn Jayasaro",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2013,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Step past external cultural ritual directly into the pristine mechanics of your own immediate awareness. Ajahn Jayasaro presents a lucid, compassionate masterclass that deconstructs Theravada Buddhism into clear, practical principles for everyday life.",
      "coreThesis": "Suffering dissolves when you stop mistaking passing mental weather for an enduring self, training direct awareness to meet reality without attachment or resistance.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Without and Within: Questions and Answers on Theravada Buddhism"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "without-conscience-the-disturbing-world-of-the-psychopaths-a",
    "title": "Without Conscience: The Disturbing World of the Psychopaths Among Us",
    "author": "Robert D. Hare",
    "category": "Psychology",
    "subcategory": "Personality & Shadow Work",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/3937557-M.jpg",
    "readingTimeMinutes": 65,
    "publishedYear": 1993,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Imagine driving alongside a sleek sports car that looks flawless on the highway, yet completely lacks physical brakes and a steering lock. Robert Hare pulls back the hood on human psychology to reveal how millions of social predators operate without a functioning moral engine.",
      "coreThesis": "Psychopathy is an enduring neurobiological deficit characterized by complete emotional numbness and absent conscience, enabling charming individuals to treat fellow human beings as interchangeable tools for selfish gain.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Without Conscience: The Disturbing World of the Psychopaths Among Us"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "words-can-change-your-brain",
    "title": "Words Can Change Your Brain",
    "author": "Andrew Newberg & Mark Robert Waldman",
    "category": "Communication",
    "subcategory": "Active Listening & Empathy",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/12938610-M.jpg",
    "readingTimeMinutes": 60,
    "publishedYear": 2012,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Every word you utter literally reshapes the physical wiring of your brain and the nervous system of whoever hears you. By mastering twelve evidence-based conversational shifts, you can dismantle social threat alarms and forge instant, biological trust.",
      "coreThesis": "A single spoken word triggers measurable neurochemical cascades that either lock the brain in defensive survival mode or synchronize both speakers in shared clarity and mutual trust.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Words Can Change Your Brain"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "words-of-dhamma-practical-meditative-advice",
    "title": "Words of Dhamma: Practical Meditative Advice",
    "author": "Sayadaw U Kundalabhivamsa",
    "category": "Spirituality",
    "subcategory": "Buddhism & Zen",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2001,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Step off the runaway train of overthinking and discover immediate mental ease through simple, precise awareness. This guide strips away esoteric mystery to show you exactly how to train your attention into an unwavering source of peace.",
      "coreThesis": "Suffering dissolves the instant you observe the present moment clearly without grasping or resistance. Continuous, gentle mindfulness reveals that all experiences\\u2014pleasant or painful\\u2014are impermanent events rather than a solid self.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Words of Dhamma: Practical Meditative Advice"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Spirituality",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "working-in-public-the-making-and-maintenance-of-open-source-",
    "title": "Working in Public: The Making and Maintenance of Open Source Software",
    "author": "Nadia Eghbal",
    "category": "Communication",
    "subcategory": "Remote & Digital Communication",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/10290182-M.jpg",
    "readingTimeMinutes": 45,
    "publishedYear": 2020,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Think open source is a harmonious digital barn-raising where everyone cheerfully builds together? In reality, modern public software resembles an exhausted solo musician performing on an open stage in a packed stadium while thousands of spectators demand custom songs for free.",
      "coreThesis": "Digital software creation has evolved from collaborative communal clubs into broadcasted stadium performances, where infinite consumer demand inevitably suffocates creator attention unless protected by strict boundaries and triage filters.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Working in Public: The Making and Maintenance of Open Source Software"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "working-with-emotional-intelligence",
    "title": "Working with Emotional Intelligence",
    "author": "Daniel Goleman",
    "category": "Psychology",
    "subcategory": "Emotional Intelligence",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/6426034-M.jpg",
    "readingTimeMinutes": 65,
    "publishedYear": 1998,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Raw intelligence gets your foot in the door, but emotional self-regulation determines how high you climb. Daniel Goleman reveals the hidden biological and interpersonal circuitry that makes top performers thrive under pressure.",
      "coreThesis": "Technical expertise is merely a baseline threshold; superior long-term performance is governed by how effectively you recognize, regulate, and channel emotional energy within yourself and among others.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Working with Emotional Intelligence"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Productivity",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "write-once-read-forever-syntopic-knowledge",
    "title": "Write Once, Read Forever (Syntopic Knowledge)",
    "author": "Selected academic treatises on hyperlinking & personal wiki architectures.",
    "category": "Productivity",
    "subcategory": "Daily Systems & Workflows",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 45,
    "publishedYear": 2021,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Stop collecting books like unopened pantry spices and start connecting them like a vibrant root network. This volume reveals how to turn scattered notes into a living personal wiki that thinks alongside you forever.",
      "coreThesis": "Knowledge compounds only when captured as autonomous, linked units that connect across different domains rather than remaining locked in isolated source summaries.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Write Once, Read Forever (Syntopic Knowledge)"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "yes-50-scientifically-proven-ways-to-be-persuasive",
    "title": "Yes! 50 Scientifically Proven Ways to Be Persuasive",
    "author": "Noah J. Goldstein, Steve J. Martin, Robert B. Cialdini",
    "category": "Sales & Persuasion",
    "subcategory": "Persuasion & Influence",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "",
    "readingTimeMinutes": 250,
    "publishedYear": 2008,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Persuasion is not a mystical art reserved for charismatic charmers\\u2014it is a measurable physical science governed by reliable psychological laws. By adjusting tiny, zero-cost conversational levers, you can tilt the odds of compliance dramatically in your favor.",
      "coreThesis": "Persuasive power does not stem from overwhelming force or innate charisma, but from subtle, evidence-based adjustments that harness natural psychological tendencies.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Yes! 50 Scientifically Proven Ways to Be Persuasive"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "you-are-not-so-smart",
    "title": "You Are Not So Smart",
    "author": "David McRaney",
    "category": "Psychology",
    "subcategory": "Cognitive Biases & Logic",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/7381653-M.jpg",
    "readingTimeMinutes": 240,
    "publishedYear": 2011,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Step behind the machinery of your own mind and discover the hidden feedback loops running your everyday life. You are not a detached rational observer, but a brilliant self-deluding storyteller who invents reality on the fly.",
      "coreThesis": "You are not a purely logical computer; your conscious self is a storyteller justifying decisions made by subconscious evolutionary circuits.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "You Are Not So Smart"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Psychology",
      "Core Insights"
    ]
  },
  {
    "id": "your-erroneous-zones",
    "title": "Your Erroneous Zones",
    "author": "Wayne W. Dyer",
    "category": "Personal Growth",
    "subcategory": "Authenticity & Self-Worth",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/5266788-M.jpg",
    "readingTimeMinutes": 55,
    "publishedYear": 1976,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Your emotional state is not caused by the weather, traffic, or other people\\u2014it is manufactured inside your own cognitive engine. Once you map the self-defeating feedback loops running your mind, you can dismantle them and claim complete operational control over your life.",
      "coreThesis": "You are the ultimate architect of your emotional reality: external circumstances only trigger distress when your internal interpretations allow them to.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Your Erroneous Zones"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  },
  {
    "id": "your-perfect-right-assertiveness-and-equality-in-your-life-a",
    "title": "Your Perfect Right: Assertiveness and Equality in Your Life and Relationships",
    "author": "Robert E. Alberti & Michael L. Emmons",
    "category": "Communication",
    "subcategory": "Boundaries & Assertiveness",
    "coverColor": "from-slate-900 to-indigo-950",
    "coverEmoji": "\ud83d\udcd6",
    "coverImageUrl": "https://covers.openlibrary.org/b/id/1667848-M.jpg",
    "readingTimeMinutes": 125,
    "publishedYear": 1970,
    "totalChapters": 10,
    "isLoaded": false,
    "onePageSummary": {
      "elevatorPitch": "Assertiveness is not an act of aggression; it is the fundamental physics of equal human interaction. By calibrating your verbal and nonverbal signals to zero submission and zero domination, you build relationships grounded in clarity, mutual dignity, and authentic power.",
      "coreThesis": "Every individual possesses the fundamental right to express their authentic needs, thoughts, and feelings directly and honestly, without violating the equal dignity and boundaries of anyone else.",
      "keyPillars": [],
      "strengths": [],
      "blindSpotsAndCounterarguments": []
    },
    "blinks": [],
    "mindMap": {
      "id": "root",
      "label": "Your Perfect Right: Assertiveness and Equality in Your Life and Relationships"
    },
    "reflectionExercises": [],
    "actionItems": [],
    "stories": [],
    "ideaCards": [],
    "tags": [
      "Philosophy",
      "Strategy",
      "Mental Models"
    ]
  }
];
