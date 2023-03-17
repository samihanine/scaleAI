import { completion } from './openAI';

type generateMessageProps = {
  scenario: {
    name: string;
    purposes: string[];
  };
  project: {
    companyName: string;
    activity?: string;
  };
  event: {
    type: 'MAIL' | 'SMS' | 'LETTER';
  };
  lead: {
    lastname?: string;
    email: string;
    phone?: string;
    organization: string;
    firstname: string;
    activity?: string;
  };
  source: {
    context: string;
  };
};

export const exampleProps: generateMessageProps = {
  scenario: {
    name: 'carte connectée',
    purposes: [
      "Amener à cliquer sur le lien vers le site web de l'entreprise",
      "Convaincre le prospect d'acheter une carte connectée",
    ],
  },
  project: {
    companyName: 'Phygitags',
    activity: 'Vente de cartes connectées',
  },
  event: {
    type: 'MAIL',
  },
  lead: {
    lastname: 'ham',
    firstname: 'dorian',
    email: 'dorian@senzu.app',
    organization: 'Senzu',
    activity: 'Développeur indépendant',
  },
  source: {
    context: "Entreprise qui vient d'être créée",
  },
};

const join = (...args: string[]) => args.join(' ');

export const generateMessage = async (props: generateMessageProps): Promise<string> => {
  const { scenario, project, event, lead, source } = props;

  const prompt = join(
    `Générer un message qui serra envoyé via ${event.type.toLowerCase()} pour le scénario "${
      scenario.name
    }" avec les objectifs suivants: ${scenario.purposes.join(', ')}.`,
    `Le projet est lié à l'entreprise "${project.companyName}" ayant pour activité "${project.activity}".`,
    `Le destinataire est ${lead.firstname} ${lead.lastname}, qui a comme activité ${lead.activity} travaillant chez ${lead.organization}.`,
    `Le contexte de la source est "${source.context}".`
  );

  const response = (await completion(prompt)) as string;

  return response;
};
