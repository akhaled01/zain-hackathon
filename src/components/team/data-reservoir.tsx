import { FC } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Link } from "lucide-react";

export const DataReservoir: FC = () => {
  const mockLinks = [
    { title: "Fashion Industry Dataset", url: "https://example.com/fashion-data", description: "Comprehensive fashion trends and consumer behavior data" },
    { title: "Material Properties Database", url: "https://example.com/materials", description: "Physical and chemical properties of textile materials" },
    { title: "Color Psychology Research", url: "https://example.com/color-psych", description: "Studies on color impact in fashion and emotions" },
    { title: "Sustainable Fashion APIs", url: "https://example.com/sustainability", description: "Environmental impact data for fashion materials" },
    { title: "Fashion Week Archives", url: "https://example.com/fashion-weeks", description: "Historical fashion show data and trends" },
    { title: "Consumer Preference Studies", url: "https://example.com/consumer-data", description: "Market research and consumer behavior analytics" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link className="w-5 h-5" />
          Data Reservoir
        </CardTitle>
        <CardDescription>
          Curated resources and datasets for your fashion challenge
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {mockLinks.map((link, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
              <ExternalLink className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm">{link.title}</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {link.description}
                </p>
                <Button variant="link" className="h-auto p-0 text-xs mt-1" asChild>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    Access Resource
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
