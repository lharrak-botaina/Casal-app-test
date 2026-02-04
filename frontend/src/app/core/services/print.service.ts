import { DatePipe } from '@angular/common';
import { ElementRef, Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF, { CellConfig } from 'jspdf';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class PrintService {
  constructor(private datePipe : DatePipe, private loadingService: LoadingService) {}

  async generateGlobalReport(
    chartsList: { title; description?; type?; elementRef?: ElementRef; value?, extraText? }[]
  ) {
    this.loadingService.busy();
    const currentDate = this.datePipe.transform(new Date(), 'dd-MM-YYYY');

    let doc = new jsPDF(); // using defaults: orientation=portrait, unit=mm, size=A4
    doc = this.setGeneralReportCoverPage(doc, currentDate);

    let i = 0;
    for (const chart of chartsList) {
      if(chart?.type == 3){
        doc = this.setLogo(doc);
        doc = this.setHeader(doc, chart?.title);   
        if(chart?.description) doc = this.setDescription(doc, chart?.description); 
        doc = this.setTableContent(doc, chart?.title, +chart?.value, chart?.extraText);
      }
      else {
        let canvas = await html2canvas(chart.elementRef.nativeElement, {
          windowWidth: 850,
          scale: 3,
        })

        let DataURL = canvas.toDataURL('image/jpeg');
  
        doc = this.setLogo(doc);
        doc = this.setHeader(doc, chart?.title);
        if(chart?.description) doc = this.setDescription(doc, chart?.description); 
        const imageWidth = chart?.type == 1 ? 250 : 200;
        doc.addImage(DataURL, 'JPEG', 10, 105, imageWidth, 200);
      }
      i++;
      if(i != chartsList?.length) doc.addPage();
    }

    doc.save(`Rapport-global-${currentDate}.pdf`); //Download the rendered PDF.
    this.loadingService.idle();
  }

  downloadPieChartPDF(report: ElementRef, title: string, description: string, imageWidth: number) {
    html2canvas(report.nativeElement, {
      windowWidth: 850,
      scale: 3,
    }).then((canvas) => {
      let DataURL = canvas.toDataURL('image/jpeg');
      let doc = new jsPDF(); // using defaults: orientation=portrait, unit=mm, size=A4

      doc = this.setLogo(doc);

      doc = this.setHeader(doc, title);

      if(description) doc = this.setDescription(doc, description);

      doc.addImage(DataURL, 'JPEG', 10, 105, imageWidth, 200);

      doc.save(`${title}.pdf`); //Download the rendered PDF.
    });
  }

  downloadBasicStatsPDF(title: string, description: string, statsValue: number, extraText: string) {
    let doc = new jsPDF(); // using defaults: orientation=portrait, unit=mm, size=A4

    doc = this.setLogo(doc);

    doc = this.setHeader(doc, title);

    if(description) doc = this.setDescription(doc, description);

    doc = this.setTableContent(doc, title, statsValue, extraText);

    doc.save(`${title}.pdf`); //Download the rendered PDF.
  }

  private setLogo(doc: jsPDF) {
    const width = doc.internal.pageSize.getWidth();

    let img = new Image();
    img.src = 'assets/logo_yellow.png';
    doc.addImage(img, width / 2 - 15, 10, 30, 20);

    return doc;
  }

  private setHeader(doc: jsPDF, title: string) {
    //HEADER
    doc.setFont('Arial', 'bold');
    const titleHeader: CellConfig[] = [
      {
        name: 'Description',
        prompt: title,
        width: 255,
        align: 'center',
        padding: 0,
      },
    ];

    doc.table(10, 35, [], titleHeader, {
      autoSize: false,
      headerBackgroundColor: '#f9b520',
      fontSize: 20,
    });

    return doc;
  }

  private setDescription(doc: jsPDF, description: string) {
    //HEADER
    doc.setFont('Arial', 'normal');
    const titleHeader: CellConfig[] = [
      {
        name: 'Description',
        prompt: description,
        width: 255,
        align: 'left',
        padding: 0,
      },
    ];

    doc.table(10, 85, [], titleHeader, {
      autoSize: false,
      fontSize: 12,
    });

    return doc;
  }

  private setTableContent(
    doc: jsPDF,
    title: string,
    statsValue: number,
    extraText: string
  ) {
    //STATS
    let data = [
      {
        Description: title,
        Valeur: statsValue?.toFixed(0) + extraText ,
      },
    ];

    let headers: CellConfig[] = [
      {
        name: 'Description',
        prompt: 'Description',
        width: 200,
        align: 'center',
        padding: 0,
      },
      {
        name: 'Valeur',
        prompt: 'Valeur',
        width: 50,
        align: 'center',
        padding: 0,
      },
    ];

    doc.table(10, 115, data, headers, { autoSize: false });

    return doc;
  }

  setGeneralReportCoverPage(doc, currentDate){
    const height = doc.internal.pageSize.getHeight();
    const width = doc.internal.pageSize.getWidth();

    doc = this.setLogo(doc);

    //HEADER
    doc.setFont('Arial', 'bold');
    const titleHeader: CellConfig[] = [
      {
        name: 'Description',
        prompt: 'Rapport général',
        width: 255,
        align: 'center',
        padding: 10,
      },
    ];

    doc.table(10, height / 2 , [], titleHeader, {
      autoSize: false,
      headerBackgroundColor: '#f9b520',
      fontSize: 20,
    });

    doc.setFontSize(10);
    doc.text(`Fait le ${currentDate}`, width - 30, height - 5)
    
    doc.addPage();

    return doc;
  }
}
