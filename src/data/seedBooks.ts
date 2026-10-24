import { Book, IdeaCard, StashBoard } from '../types';
import { ATOMIC_HABITS_BOOK } from './books/atomicHabitsExpanded';
import { DEEP_WORK_BOOK } from './books/deepWorkExpanded';
import { THINKING_FAST_AND_SLOW_BOOK } from './books/thinkingFastAndSlowExpanded';
import { PSYCHOLOGY_OF_MONEY_BOOK } from './books/psychologyOfMoneyExpanded';
import { MEDITATIONS_BOOK } from './books/meditationsExpanded';
import { SEVEN_POWERS_BOOK } from './books/sevenPowersExpanded';

import { POOR_CHARLIE_S_ALMANACK_BOOK } from './books/poorCharlieSAlmanackExpanded';
import { THE_GREAT_MENTAL_MODELS_VOL_1_2_BOOK } from './books/theGreatMentalModelsVol12Expanded';
import { YOU_ARE_NOT_SO_SMART_BOOK } from './books/youAreNotSoSmartExpanded';
import { FACTFULNESS_BOOK } from './books/factfulnessExpanded';
import { THE_BLACK_SWAN_BOOK } from './books/theBlackSwanExpanded';
import { FOOLED_BY_RANDOMNESS_BOOK } from './books/fooledByRandomnessExpanded';
import { CLEAR_THINKING_BOOK } from './books/clearThinkingExpanded';
import { THINKING_IN_BETS_BOOK } from './books/thinkingInBetsExpanded';
import { SOURCES_OF_POWER_BOOK } from './books/sourcesOfPowerExpanded';
import { ALGORITHMS_TO_LIVE_BY_BOOK } from './books/algorithmsToLiveByExpanded';
import { DECISIVE_BOOK } from './books/decisiveExpanded';
import { SMART_CHOICES_BOOK } from './books/smartChoicesExpanded';
import { HOW_TO_DECIDE_BOOK } from './books/howToDecideExpanded';
import { BLINK_THE_POWER_OF_THINKING_WITHOUT_THINKING_BOOK } from './books/blinkThePowerOfThinkingWithoutThinkingExpanded';
import { RISK_SAVVY_HOW_TO_MAKE_GOOD_DECISIONS_BOOK } from './books/riskSavvyHowToMakeGoodDecisionsExpanded';
import { NUDGE_BOOK } from './books/nudgeExpanded';
import { THE_PARADOX_OF_CHOICE_BOOK } from './books/theParadoxOfChoiceExpanded';
import { SUPERFORECASTING_THE_ART_AND_SCIENCE_OF_PREDICTION_BOOK } from './books/superforecastingTheArtAndScienceOfPredictionExpanded';
import { THE_SIGNAL_AND_THE_NOISE_BOOK } from './books/theSignalAndTheNoiseExpanded';
import { THE_SCOUT_MINDSET_BOOK } from './books/theScoutMindsetExpanded';
import { SKIN_IN_THE_GAME_BOOK } from './books/skinInTheGameExpanded';
import { EXPERT_POLITICAL_JUDGMENT_BOOK } from './books/expertPoliticalJudgmentExpanded';
import { THE_LOGIC_OF_SCIENTIFIC_DISCOVERY_BOOK } from './books/theLogicOfScientificDiscoveryExpanded';
import { HOW_NOT_TO_BE_WRONG_THE_POWER_OF_MATHEMATICAL_THINKING_BOOK } from './books/howNotToBeWrongThePowerOfMathematicalThinkingExpanded';
import { THE_MODEL_THINKER_BOOK } from './books/theModelThinkerExpanded';
import { THINKING_IN_SYSTEMS_A_PRIMER_BOOK } from './books/thinkingInSystemsAPrimerExpanded';
import { THE_FIFTH_DISCIPLINE_BOOK } from './books/theFifthDisciplineExpanded';
import { ANTIFRAGILE_THINGS_THAT_GAIN_FROM_DISORDER_BOOK } from './books/antifragileThingsThatGainFromDisorderExpanded';
import { THE_FORTY_RULES_OF_LOVE_BOOK } from './books/theFortyRulesOfLoveExpanded';
import { COMPLEXITY_A_GUIDED_TOUR_BOOK } from './books/complexityAGuidedTourExpanded';
import { SCALE_BOOK } from './books/scaleExpanded';
import { THE_SYSTEMS_VIEW_OF_LIFE_BOOK } from './books/theSystemsViewOfLifeExpanded';
import { SYNC_HOW_ORDER_EMERGES_FROM_CHAOS_BOOK } from './books/syncHowOrderEmergesFromChaosExpanded';
import { SEEING_SYSTEMS_UNLOCKING_THE_MYSTERIES_OF_ORGANIZATIONAL_LIF_BOOK } from './books/seeingSystemsUnlockingTheMysteriesOfOrganizationalLifExpanded';
import { LINKED_HOW_EVERYTHING_IS_CONNECTED_BOOK } from './books/linkedHowEverythingIsConnectedExpanded';
import { THE_CHECKLIST_MANIFESTO_BOOK } from './books/theChecklistManifestoExpanded';
import { ULTRALEARNING_BOOK } from './books/ultralearningExpanded';
import { MOONWALKING_WITH_EINSTEIN_BOOK } from './books/moonwalkingWithEinsteinExpanded';
import { MAKE_IT_STICK_THE_SCIENCE_OF_SUCCESSFUL_LEARNING_BOOK } from './books/makeItStickTheScienceOfSuccessfulLearningExpanded';
import { THE_BRAIN_THAT_CHANGES_ITSELF_BOOK } from './books/theBrainThatChangesItselfExpanded';
import { A_MIND_FOR_NUMBERS_BOOK } from './books/aMindForNumbersExpanded';
export const SEED_BOOKS: Book[] = [
  ALGORITHMS_TO_LIVE_BY_BOOK,
  ATOMIC_HABITS_BOOK,
  BLINK_THE_POWER_OF_THINKING_WITHOUT_THINKING_BOOK,
  CLEAR_THINKING_BOOK,
  DECISIVE_BOOK,
  DEEP_WORK_BOOK,
  FACTFULNESS_BOOK,
  FOOLED_BY_RANDOMNESS_BOOK,
  HOW_TO_DECIDE_BOOK,
  MEDITATIONS_BOOK,
  NUDGE_BOOK,
  POOR_CHARLIE_S_ALMANACK_BOOK,
  PSYCHOLOGY_OF_MONEY_BOOK,
  RISK_SAVVY_HOW_TO_MAKE_GOOD_DECISIONS_BOOK,
  SEVEN_POWERS_BOOK,
  SMART_CHOICES_BOOK,
  SOURCES_OF_POWER_BOOK,
  SUPERFORECASTING_THE_ART_AND_SCIENCE_OF_PREDICTION_BOOK,
  THE_BLACK_SWAN_BOOK,
  THE_GREAT_MENTAL_MODELS_VOL_1_2_BOOK,
  THE_PARADOX_OF_CHOICE_BOOK,
  THE_SCOUT_MINDSET_BOOK,
  THE_SIGNAL_AND_THE_NOISE_BOOK,
  THINKING_FAST_AND_SLOW_BOOK,
  THINKING_IN_BETS_BOOK,
  YOU_ARE_NOT_SO_SMART_BOOK,
  SKIN_IN_THE_GAME_BOOK,
  EXPERT_POLITICAL_JUDGMENT_BOOK,
  THE_LOGIC_OF_SCIENTIFIC_DISCOVERY_BOOK,
  HOW_NOT_TO_BE_WRONG_THE_POWER_OF_MATHEMATICAL_THINKING_BOOK,
  THE_MODEL_THINKER_BOOK,
  THINKING_IN_SYSTEMS_A_PRIMER_BOOK,
  THE_FIFTH_DISCIPLINE_BOOK,
  ANTIFRAGILE_THINGS_THAT_GAIN_FROM_DISORDER_BOOK,
  THE_FORTY_RULES_OF_LOVE_BOOK,
  COMPLEXITY_A_GUIDED_TOUR_BOOK,
  SCALE_BOOK,
  THE_SYSTEMS_VIEW_OF_LIFE_BOOK,
  SYNC_HOW_ORDER_EMERGES_FROM_CHAOS_BOOK,
  SEEING_SYSTEMS_UNLOCKING_THE_MYSTERIES_OF_ORGANIZATIONAL_LIF_BOOK,
  LINKED_HOW_EVERYTHING_IS_CONNECTED_BOOK,
  THE_CHECKLIST_MANIFESTO_BOOK,
  ULTRALEARNING_BOOK,
  MOONWALKING_WITH_EINSTEIN_BOOK,
  MAKE_IT_STICK_THE_SCIENCE_OF_SUCCESSFUL_LEARNING_BOOK,
  THE_BRAIN_THAT_CHANGES_ITSELF_BOOK,
  A_MIND_FOR_NUMBERS_BOOK
];

export const SEED_IDEAS: IdeaCard[] = [
  ...(ALGORITHMS_TO_LIVE_BY_BOOK.ideaCards || []),
  ...(ATOMIC_HABITS_BOOK.ideaCards || []),
  ...(BLINK_THE_POWER_OF_THINKING_WITHOUT_THINKING_BOOK.ideaCards || []),
  ...(CLEAR_THINKING_BOOK.ideaCards || []),
  ...(DECISIVE_BOOK.ideaCards || []),
  ...(DEEP_WORK_BOOK.ideaCards || []),
  ...(FACTFULNESS_BOOK.ideaCards || []),
  ...(FOOLED_BY_RANDOMNESS_BOOK.ideaCards || []),
  ...(HOW_TO_DECIDE_BOOK.ideaCards || []),
  ...(MEDITATIONS_BOOK.ideaCards || []),
  ...(NUDGE_BOOK.ideaCards || []),
  ...(POOR_CHARLIE_S_ALMANACK_BOOK.ideaCards || []),
  ...(PSYCHOLOGY_OF_MONEY_BOOK.ideaCards || []),
  ...(RISK_SAVVY_HOW_TO_MAKE_GOOD_DECISIONS_BOOK.ideaCards || []),
  ...(SEVEN_POWERS_BOOK.ideaCards || []),
  ...(SMART_CHOICES_BOOK.ideaCards || []),
  ...(SOURCES_OF_POWER_BOOK.ideaCards || []),
  ...(SUPERFORECASTING_THE_ART_AND_SCIENCE_OF_PREDICTION_BOOK.ideaCards || []),
  ...(THE_BLACK_SWAN_BOOK.ideaCards || []),
  ...(THE_GREAT_MENTAL_MODELS_VOL_1_2_BOOK.ideaCards || []),
  ...(THE_PARADOX_OF_CHOICE_BOOK.ideaCards || []),
  ...(THE_SCOUT_MINDSET_BOOK.ideaCards || []),
  ...(THE_SIGNAL_AND_THE_NOISE_BOOK.ideaCards || []),
  ...(THINKING_FAST_AND_SLOW_BOOK.ideaCards || []),
  ...(THINKING_IN_BETS_BOOK.ideaCards || []),
  ...(YOU_ARE_NOT_SO_SMART_BOOK.ideaCards || []),
  ...(SKIN_IN_THE_GAME_BOOK.ideaCards || []),
  ...(EXPERT_POLITICAL_JUDGMENT_BOOK.ideaCards || []),
  ...(THE_LOGIC_OF_SCIENTIFIC_DISCOVERY_BOOK.ideaCards || []),
  ...(HOW_NOT_TO_BE_WRONG_THE_POWER_OF_MATHEMATICAL_THINKING_BOOK.ideaCards || []),
  ...(THE_MODEL_THINKER_BOOK.ideaCards || []),
  ...(THINKING_IN_SYSTEMS_A_PRIMER_BOOK.ideaCards || []),
  ...(THE_FIFTH_DISCIPLINE_BOOK.ideaCards || []),
  ...(ANTIFRAGILE_THINGS_THAT_GAIN_FROM_DISORDER_BOOK.ideaCards || []),
  ...(THE_FORTY_RULES_OF_LOVE_BOOK.ideaCards || []),
  ...(COMPLEXITY_A_GUIDED_TOUR_BOOK.ideaCards || []),
  ...(SCALE_BOOK.ideaCards || []),
  ...(THE_SYSTEMS_VIEW_OF_LIFE_BOOK.ideaCards || []),
  ...(SYNC_HOW_ORDER_EMERGES_FROM_CHAOS_BOOK.ideaCards || []),
  ...(SEEING_SYSTEMS_UNLOCKING_THE_MYSTERIES_OF_ORGANIZATIONAL_LIF_BOOK.ideaCards || []),
  ...(LINKED_HOW_EVERYTHING_IS_CONNECTED_BOOK.ideaCards || []),
  ...(THE_CHECKLIST_MANIFESTO_BOOK.ideaCards || []),
  ...(ULTRALEARNING_BOOK.ideaCards || []),
  ...(MOONWALKING_WITH_EINSTEIN_BOOK.ideaCards || []),
  ...(MAKE_IT_STICK_THE_SCIENCE_OF_SUCCESSFUL_LEARNING_BOOK.ideaCards || []),
  ...(THE_BRAIN_THAT_CHANGES_ITSELF_BOOK.ideaCards || []),
  ...(A_MIND_FOR_NUMBERS_BOOK.ideaCards || [])
];

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

