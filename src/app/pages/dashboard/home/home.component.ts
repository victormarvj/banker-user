import { Component, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../../shared/angular-material/angular-material.module';
import { AngularChartsModule } from '../../../shared/angular-charts/angular-charts.module';
import { ThemesService } from '../../../services/themes.service';
import { text } from 'stream/consumers';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AngularMaterialModule, AngularChartsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  theme: string = '';
  color: string = '';

  constructor(private themeService: ThemesService) {}

  ngOnInit(): void {
    this.themeService.initTheme();
    this.applyTheme();
  }

  applyTheme() {
    this.theme = this.themeService.currentTheme;
    if (this.theme === 'light') {
      this.color = '#fff';
    } else {
      this.color = 'rgba(5, 6, 36, .7)';
    }
  }

  chartOptions = {
    animationEnabled: true,
    backgroundColor: this.color,
    title: {
      text: 'Growth Plan',
      fontSize: 15,
    },
    subtitles: [
      {
        text: '6,79%',
        //Uncomment properties below to see how they behave
        fontColor: 'green',
        fontSize: 10,
      },
    ],
    axisY: {
      title: 'Target',
      valueFormatString: '#0,,.',
      suffix: 'M',
    },
    // height: 200,
    data: [
      {
        type: 'splineArea',
        lineColor: '#3e79e5',
        fillOpacity: 0.9,
        color: 'rgba(224, 236, 252,.7)',
        xValueFormatString: 'YYYY',
        dataPoints: [
          { x: new Date(2018, 0), y: 24000000 }, // Initial value
          { x: new Date(2019, 0), y: 25980000 }, // Increase
          { x: new Date(2020, 0), y: 26000000 }, // Dip
          { x: new Date(2021, 0), y: 27000000 }, // Increase
          { x: new Date(2022, 0), y: 29000000 }, // Small dip
          { x: new Date(2023, 0), y: 30000000 }, // Significant increase
          { x: new Date(2024, 0), y: 30005000 }, // Small dip
          { x: new Date(2025, 0), y: 29000000 }, // Increase
          { x: new Date(2026, 0), y: 29000000 }, // Small dip
          { x: new Date(2027, 0), y: 30000000 }, // Increase
          { x: new Date(2028, 0), y: 33000000 }, // Small dip
          { x: new Date(2029, 0), y: 34000000 }, // Increase
          { x: new Date(2030, 0), y: 34000000 }, // Dip
          { x: new Date(2031, 0), y: 34000000 }, // Final increase
        ],
      },
    ],
  };
}
